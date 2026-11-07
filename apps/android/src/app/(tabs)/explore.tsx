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
import { TRANSPORT_MODE_LABELS, type Place } from '../../data/types';

/**
 * Explore tab: Agadir places and transport-category guides.
 *
 * Destination cards are photo-led in the chosen design; this pilot has no
 * photos to bundle, so each card has a colour-led tile instead (navy, cyan
 * and orange from the brand palette). Guide cards explain how each mode
 * works in general terms; fares, routes and times are not verified yet and
 * the cards say so.
 */
const GUIDE_MODES = ['grand-taxi', 'petit-taxi', 'city-bus'] as const;

type Category = 'all' | 'coast' | 'city' | 'viewpoints';

function categoryOf(place: Place): 'coast' | 'city' | 'viewpoints' {
  if (place.kind === 'beach' || place.kind === 'marina') return 'coast';
  if (place.kind === 'landmark') return 'viewpoints';
  return 'city';
}

/** Colour-led tile styles, cycled per card; scheme-aware for contrast. */
const TILE_STYLES_LIGHT = [
  { backgroundColor: '#102B46', color: '#FFFFFF' },
  { backgroundColor: '#0D99B5', color: '#FFFFFF' },
  { backgroundColor: '#F36D3C', color: '#FFFFFF' },
];
const TILE_STYLES_DARK = [
  { backgroundColor: '#243B55', color: '#F5F8FD' },
  { backgroundColor: '#4FC3DB', color: '#0D1826' },
  { backgroundColor: '#FF895D', color: '#0D1826' },
];

const CATEGORIES: Category[] = ['all', 'coast', 'city', 'viewpoints'];

export default function ExploreScreen() {
  const { palette, scheme, textScale } = useAppTheme();
  const { t, locale } = useI18n();
  const router = useRouter();
  const [openGuide, setOpenGuide] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>('all');

  const tileStyles = scheme === 'dark' ? TILE_STYLES_DARK : TILE_STYLES_LIGHT;
  const places =
    category === 'all' ? DEMO_PLACES : DEMO_PLACES.filter((p) => categoryOf(p) === category);

  const categoryLabel = (c: Category) =>
    c === 'all'
      ? t('categoryAll')
      : c === 'coast'
        ? t('categoryCoast')
        : c === 'city'
          ? t('categoryCity')
          : t('categoryViewpoints');

  return (
    <Screen title={t('exploreTitle')} demo>
      <Text style={[styles.subtitle, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('exploreSubtitle')}
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/(tabs)/nearby')}
        style={[styles.link, { borderColor: palette.border }]}
      >
        <Text style={[styles.linkText, { color: palette.accentText, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('nearbyTransport')}
        </Text>
      </Pressable>

      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('places')}
      </Text>
      <View style={styles.chipRow}>
        {CATEGORIES.map((c) => {
          const selected = category === c;
          return (
            <Pressable
              key={c}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setCategory(c)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? palette.accent : palette.surface,
                  borderColor: selected ? palette.accent : palette.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color: selected ? palette.onAccent : palette.text,
                    fontSize: scaled(fontSize.sm, textScale),
                  },
                ]}
              >
                {categoryLabel(c)}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={{ gap: spacing.md }}>
        {places.map((place, index) => {
          const tile = tileStyles[index % tileStyles.length];
          return (
            <Pressable
              key={place.id}
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/stop/[id]', params: { id: place.id } })}
              style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}
            >
              <View style={[styles.tile, { backgroundColor: tile.backgroundColor }]}>
                <Text style={[styles.tileLetter, { color: tile.color }]}>
                  {place.names[locale].charAt(0).toUpperCase()}
                </Text>
                <View style={styles.tileBadge}>
                  <DemoBadge />
                </View>
              </View>
              <View style={styles.cardBody}>
                <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                  {place.names[locale]}
                </Text>
                <Text style={[styles.rowMeta, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
                  {place.kind} · {place.description[locale]}
                </Text>
                <Text style={[styles.link, { color: palette.accentText, fontSize: scaled(fontSize.md, textScale) }]}>
                  {t('seePlace')} ›
                </Text>
              </View>
            </Pressable>
          );
        })}
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
          const guideText =
            mode === 'grand-taxi'
              ? t('guideGrandTaxiText')
              : mode === 'petit-taxi'
                ? t('guidePetitTaxiText')
                : t('guideCityBusText');
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
                <>
                  <Text style={[styles.rowMeta, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                    {guideText}
                  </Text>
                  <Text style={[styles.rowMeta, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
                    {t('guideInfoUnavailable')}
                  </Text>
                </>
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
  link: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: { fontWeight: '700' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: { fontWeight: '700' },
  card: { borderWidth: 1, borderRadius: 20, overflow: 'hidden' },
  tile: {
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLetter: { fontSize: 44, fontWeight: '800' },
  tileBadge: { position: 'absolute', top: spacing.sm, right: spacing.sm },
  cardBody: { padding: spacing.lg, gap: spacing.xs },
  row: { borderWidth: 1, borderRadius: 20, padding: spacing.md, gap: spacing.xs },
  rowTitle: { fontWeight: '700', lineHeight: 22 },
  rowMeta: { lineHeight: 20 },
  footnote: { lineHeight: 20 },
});
