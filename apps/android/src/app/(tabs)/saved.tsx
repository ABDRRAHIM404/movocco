import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Screen } from '../../components/Screen';
import { EmptyState } from '../../components/EmptyState';
import { DemoBadge } from '../../components/DemoBadge';
import { fontSize, scaled, spacing } from '../../theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useI18n } from '../../i18n/I18nContext';
import { loadSavedJourneys } from '../../lib/storage';
import type { SavedJourney } from '../../data/types';

/**
 * Saved tab: journeys saved on this device, readable offline.
 * Snapshots are local only in Level A — there is no backend sync yet.
 */
export default function SavedScreen() {
  const { palette, textScale } = useAppTheme();
  const { t } = useI18n();
  const router = useRouter();
  const [saved, setSaved] = useState<SavedJourney[]>([]);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const loaded = await loadSavedJourneys();
        if (!cancelled) setSaved(loaded);
      })();
      return () => {
        cancelled = true;
      };
    }, []),
  );

  return (
    <Screen title={t('savedTitle')} demo>
      <Text style={[styles.subtitle, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('savedSubtitle')}
      </Text>

      {saved.length === 0 ? (
        <EmptyState title={t('savedEmpty')} hint={t('savedEmptyHint')} />
      ) : (
        <View style={{ gap: spacing.sm }}>
          {saved.map((entry) => (
            <Pressable
              key={entry.journeyId}
              accessibilityRole="button"
              onPress={() =>
                router.push({ pathname: '/saved/[id]', params: { id: entry.journeyId } })
              }
              style={[styles.row, { backgroundColor: palette.surface, borderColor: palette.border }]}
            >
              <View style={styles.rowTop}>
                <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                  {entry.originName} → {entry.destinationName}
                </Text>
                <DemoBadge />
              </View>
              <Text style={[styles.rowMeta, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
                {t('journeySavedOn')}: {entry.savedOn}
              </Text>
              <Text style={[styles.rowMeta, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
                {entry.fareText} · {entry.durationText}
              </Text>
              <Text style={[styles.link, { color: palette.accentText, fontSize: scaled(fontSize.md, textScale) }]}>
                {t('openOfflineReader')} ›
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: { lineHeight: 24 },
  row: { borderWidth: 1, borderRadius: 12, padding: spacing.md, gap: spacing.xs },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.sm },
  rowTitle: { fontWeight: '700', flex: 1 },
  rowMeta: {},
  link: { fontWeight: '700' },
});
