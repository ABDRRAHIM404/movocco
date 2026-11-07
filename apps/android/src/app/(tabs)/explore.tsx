import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../components/Screen';
import { EmptyState } from '../../components/EmptyState';
import { DemoBadge } from '../../components/DemoBadge';
import { fontSize, scaled, spacing } from '../../theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useI18n } from '../../i18n/I18nContext';
import { DEMO_PLACES } from '../../data/demo';
import { TRANSPORT_MODE_LABELS } from '../../data/types';

/**
 * Explore tab: Agadir places and transport-category guides.
 * Guide content is not verified yet, so the guides honestly say so instead
 * of presenting invented instructions.
 */
const GUIDE_MODES = ['grand-taxi', 'petit-taxi', 'city-bus'] as const;

export default function ExploreScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale } = useI18n();
  const router = useRouter();
  const [openGuide, setOpenGuide] = useState<string | null>(null);

  return (
    <Screen title={t('exploreTitle')} demo>
      <Text style={[styles.subtitle, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('exploreSubtitle')}
      </Text>

      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('places')}
      </Text>
      <View style={{ gap: spacing.sm }}>
        {DEMO_PLACES.map((place) => (
          <Pressable
            key={place.id}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/stop/[id]', params: { id: place.id } })}
            style={[styles.row, { backgroundColor: palette.surface, borderColor: palette.border }]}
          >
            <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
              {place.names[locale]}
            </Text>
            <Text style={[styles.rowMeta, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
              {place.kind} · {place.description[locale]}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionRow}>
        <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
          {t('transportGuides')}
        </Text>
        <DemoBadge />
      </View>
      <View style={{ gap: spacing.sm }}>
        {GUIDE_MODES.map((mode) => {
          const open = openGuide === mode;
          const guideTitle =
            mode === 'grand-taxi'
              ? t('guideGrandTaxi')
              : mode === 'petit-taxi'
                ? t('guidePetitTaxi')
                : t('guideCityBus');
          return (
            <View
              key={mode}
              style={[styles.row, { backgroundColor: palette.surface, borderColor: palette.border }]}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: open }}
                onPress={() => setOpenGuide(open ? null : mode)}
              >
                <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                  {TRANSPORT_MODE_LABELS[mode][locale]} — {guideTitle}
                </Text>
              </Pressable>
              {open && (
                <Text style={[styles.rowMeta, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
                  {t('guideInfoUnavailable')}
                </Text>
              )}
            </View>
          );
        })}
      </View>

      <Text style={[styles.footnote, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('demoNotice')}
      </Text>
      <EmptyState title={t('noVerifiedData')} hint={t('noVerifiedDataHint')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: { lineHeight: 24 },
  section: { fontWeight: '700' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  row: { borderWidth: 1, borderRadius: 12, padding: spacing.md, gap: spacing.xs },
  rowTitle: { fontWeight: '700', lineHeight: 22 },
  rowMeta: { lineHeight: 20 },
  footnote: { lineHeight: 20 },
});
