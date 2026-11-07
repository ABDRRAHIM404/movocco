import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '../../components/Screen';
import { EmptyState } from '../../components/EmptyState';
import { DemoBadge } from '../../components/DemoBadge';
import { fontSize, scaled, spacing } from '../../theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useI18n } from '../../i18n/I18nContext';
import { loadSavedJourneys } from '../../lib/storage';
import type { SavedJourney } from '../../data/types';

/**
 * Offline instruction reader: shows a saved journey's plain-text snapshot
 * with its saved date and the "may be outdated" warning. Works with no
 * connection at all — the snapshot lives on the device.
 */
export default function OfflineReaderScreen() {
  const { palette, textScale } = useAppTheme();
  const { t } = useI18n();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const [entry, setEntry] = useState<SavedJourney | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    void loadSavedJourneys().then((list) => {
      if (cancelled) return;
      setEntry(list.find((s) => s.journeyId === params.id) ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (entry === undefined) {
    return (
      <Screen title={t('savedTitle')} back>
        <Text style={[styles.loading, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('loading')}
        </Text>
      </Screen>
    );
  }

  if (entry === null) {
    return (
      <Screen title={t('savedTitle')} back>
        <EmptyState
          title={t('savedEmpty')}
          hint={t('savedEmptyHint')}
          actionLabel={t('back')}
          onAction={() => router.back()}
        />
      </Screen>
    );
  }

  return (
    <Screen title={`${entry.originName} → ${entry.destinationName}`} demo back>
      <View style={[styles.warn, { backgroundColor: palette.demoBackground, borderColor: palette.demo }]}>
        <DemoBadge />
        <Text style={[styles.warnText, { color: palette.demo, fontSize: scaled(fontSize.sm, textScale) }]}>
          {t('journeySavedOn')}: {entry.savedOn}
        </Text>
        <Text style={[styles.warnText, { color: palette.demo, fontSize: scaled(fontSize.sm, textScale) }]}>
          {t('offlineWarning')}
        </Text>
      </View>
      <Text style={[styles.snapshot, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
        {entry.snapshotText}
      </Text>
      <Text style={[styles.meta, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {entry.fareText} · {entry.durationText}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  loading: {},
  warn: {
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  warnText: { lineHeight: 20 },
  snapshot: { lineHeight: 26 },
  meta: {},
});
