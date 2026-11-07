import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '../../components/Screen';
import { EmptyState } from '../../components/EmptyState';
import { DemoBadge } from '../../components/DemoBadge';
import { MapSchematic, type MapPoint } from '../../components/MapSchematic';
import { SourceBadge } from '../../components/SourceBadge';
import { fontSize, scaled, spacing } from '../../theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useI18n } from '../../i18n/I18nContext';
import { useSettings } from '../../settings/SettingsContext';
import { getJourney, getPlace } from '../../data/demo';
import { TRANSPORT_MODE_LABELS } from '../../data/types';
import { durationText, fareText } from '../../lib/journey';
import { loadSavedJourneys, removeSavedJourney, saveJourneyEntry } from '../../lib/storage';

/**
 * Journey detail: step timeline, schematic map + list fallback, cost/range,
 * transfers, provenance. Saving stores a plain-text offline snapshot.
 */
export default function JourneyDetailScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale } = useI18n();
  const { settings } = useSettings();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const [saved, setSaved] = useState<boolean | null>(null);
  const [reportOpen, setReportOpen] = useState(false);

  const journey = params.id !== undefined ? getJourney(params.id) : undefined;
  const journeyId = journey?.id;

  useEffect(() => {
    let cancelled = false;
    if (journeyId === undefined) return undefined;
    void loadSavedJourneys().then((list) => {
      if (!cancelled) setSaved(list.some((s) => s.journeyId === journeyId));
    });
    return () => {
      cancelled = true;
    };
  }, [journeyId]);

  if (journey === undefined) {
    return (
      <Screen title={t('resultsTitle')} back>
        <EmptyState
          title={t('resultsEmpty')}
          hint={t('resultsEmptyHint')}
          actionLabel={t('back')}
          onAction={() => router.back()}
        />
      </Screen>
    );
  }

  const origin = getPlace(journey.originId);
  const destination = getPlace(journey.destinationId);
  const fare = fareText(journey);
  const duration = durationText(journey);
  const transfers = Math.max(0, journey.legs.length - 1);

  // Map points in travel order: origin, then each leg's destination.
  const points: MapPoint[] = [];
  if (origin !== undefined) {
    points.push({ place: origin, label: origin.names[locale], kind: 'origin' });
  }
  journey.legs.forEach((leg, index) => {
    const place = getPlace(leg.toPlaceId);
    if (place !== undefined && place.id !== origin?.id) {
      points.push({
        place,
        label: place.names[locale],
        kind: index === journey.legs.length - 1 ? 'destination' : 'stop',
      });
    }
  });

  const stepLines = journey.legs.map((leg, index) => {
    const from = getPlace(leg.fromPlaceId)?.names[locale] ?? leg.fromPlaceId;
    const to = getPlace(leg.toPlaceId)?.names[locale] ?? leg.toPlaceId;
    const legFare =
      leg.fareMinMad === null || leg.fareMaxMad === null
        ? t('fareUnknown')
        : leg.fareMinMad === 0 && leg.fareMaxMad === 0
          ? '0 MAD'
          : `${leg.fareMinMad}–${leg.fareMaxMad} MAD`;
    const legDuration =
      leg.durationMin === null || leg.durationMax === null
        ? t('durationUnknown')
        : `${leg.durationMin}–${leg.durationMax} min`;
    return (
      `${index + 1}. ${TRANSPORT_MODE_LABELS[leg.mode][locale]}: ${from} → ${to}\n` +
      `   ${t('boardingPoint')}: ${leg.boardingPoint}\n` +
      `   ${t('direction')}: ${leg.direction}\n` +
      `   ${legFare} · ${legDuration}` +
      (leg.note !== null ? `\n   ${leg.note}` : '')
    );
  });

  const snapshotText =
    `${origin?.names[locale] ?? journey.originId} → ${destination?.names[locale] ?? journey.destinationId}\n` +
    `${t('fareRange')}: ${fare ?? t('fareUnknown')} · ${t('durationRange')}: ${duration ?? t('durationUnknown')}\n\n` +
    `${t('steps')}:\n${stepLines.join('\n')}`;

  const isSaved = saved === true;
  const toggleSave = async () => {
    if (isSaved) {
      await removeSavedJourney(journey.id);
      setSaved(false);
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    await saveJourneyEntry({
      journeyId: journey.id,
      originName: origin?.names[locale] ?? journey.originId,
      destinationName: destination?.names[locale] ?? journey.destinationId,
      snapshotText,
      savedOn: today,
      fareText: fare ?? t('fareUnknown'),
      durationText: duration ?? t('durationUnknown'),
    });
    setSaved(true);
  };

  // Initial saved state loads in the effect above; `null` means "not loaded yet".

  return (
    <Screen title={t('resultsTitle')} demo back>
      <Text style={[styles.route, { color: palette.text, fontSize: scaled(fontSize.xl, textScale) }]}>
        {origin?.names[locale] ?? journey.originId} → {destination?.names[locale] ?? journey.destinationId}
      </Text>

      <View style={[styles.notice, { backgroundColor: palette.demoBackground, borderColor: palette.demo }]}>
        <DemoBadge />
        <Text style={[styles.noticeText, { color: palette.demo, fontSize: scaled(fontSize.sm, textScale) }]}>
          {t('demoJourneyNotice')}
        </Text>
      </View>

      <Text style={[styles.meta, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('fareRange')}: {fare ?? t('fareUnknown')}
        {'   '}
        {t('durationRange')}: {duration ?? t('durationUnknown')}
      </Text>
      <Text style={[styles.meta, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {journey.legs.length} {t('legs')} ·{' '}
        {transfers === 0 ? t('noTransfers') : `${transfers} ${t('transfers')}`}
      </Text>

      <MapSchematic points={points} lowData={settings.lowData} />

      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('steps')}
      </Text>
      <View style={{ gap: spacing.md }}>
        {journey.legs.map((leg, index) => {
          const from = getPlace(leg.fromPlaceId)?.names[locale] ?? leg.fromPlaceId;
          const to = getPlace(leg.toPlaceId)?.names[locale] ?? leg.toPlaceId;
          const legFare =
            leg.fareMinMad === null || leg.fareMaxMad === null
              ? t('fareUnknown')
              : leg.fareMinMad === 0 && leg.fareMaxMad === 0
                ? '0 MAD'
                : `${leg.fareMinMad}–${leg.fareMaxMad} MAD`;
          const legDuration =
            leg.durationMin === null || leg.durationMax === null
              ? t('durationUnknown')
              : `${leg.durationMin}–${leg.durationMax} min`;
          return (
            <View
              key={`${leg.fromPlaceId}-${leg.toPlaceId}-${index}`}
              style={[styles.step, { backgroundColor: palette.surface, borderColor: palette.border }]}
            >
              <Text style={[styles.stepTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                {index + 1}. {TRANSPORT_MODE_LABELS[leg.mode][locale]}: {from} → {to}
              </Text>
              <Text style={[styles.stepText, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
                {t('boardingPoint')}: {leg.boardingPoint}
              </Text>
              <Text style={[styles.stepText, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
                {t('direction')}: {leg.direction}
              </Text>
              <Text style={[styles.stepText, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
                {t('getOffAt')}: {to}
              </Text>
              <Text style={[styles.stepText, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                {legFare} · {legDuration}
              </Text>
              {leg.walking && (
                <Text style={[styles.stepText, { color: palette.warning, fontSize: scaled(fontSize.md, textScale) }]}>
                  {t('walkNote')}
                </Text>
              )}
              {leg.note !== null && (
                <Text style={[styles.stepText, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
                  {leg.note}
                </Text>
              )}
            </View>
          );
        })}
      </View>

      <SourceBadge source={journey.source} />
      <Text style={[styles.meta, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('noBookingLink')}
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => void toggleSave()}
        style={[styles.primary, { backgroundColor: palette.accent }]}
      >
        <Text style={[styles.primaryText, { color: palette.onAccent, fontSize: scaled(fontSize.md, textScale) }]}>
          {isSaved ? t('unsaveJourney') : t('saveJourney')}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => setReportOpen((v) => !v)}
        style={styles.report}
      >
        <Text style={[styles.reportText, { color: palette.accentText, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('reportIssue')}
        </Text>
      </Pressable>
      {reportOpen && (
        <EmptyState title={t('signInUnavailable')} hint={t('signInUnavailableHint')} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  route: { fontWeight: '800' },
  notice: {
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  noticeText: { lineHeight: 20 },
  meta: { lineHeight: 22 },
  section: { fontWeight: '700' },
  step: { borderWidth: 1, borderRadius: 12, padding: spacing.md, gap: spacing.xs },
  stepTitle: { fontWeight: '700', lineHeight: 22 },
  stepText: { lineHeight: 22 },
  primary: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { fontWeight: '800' },
  report: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  reportText: { fontWeight: '700' },
});
