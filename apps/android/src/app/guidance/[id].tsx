import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '../../components/Screen';
import { EmptyState } from '../../components/EmptyState';
import { DemoBadge } from '../../components/DemoBadge';
import { fontSize, scaled, spacing } from '../../theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useI18n } from '../../i18n/I18nContext';
import { getJourney, getPlace } from '../../data/demo';
import { TRANSPORT_MODE_LABELS } from '../../data/types';

interface GuidanceStep {
  title: string;
  lines: string[];
}

/**
 * Turn-by-turn guidance for a demo journey: one large step at a time, with
 * Next and Exit. Manual steps only — there is no live GPS tracking in this
 * pilot, and the screen says so.
 */
export default function GuidanceScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale } = useI18n();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const [stepIndex, setStepIndex] = useState(0);

  const journey = params.id !== undefined ? getJourney(params.id) : undefined;

  if (journey === undefined) {
    return (
      <Screen title={t('guidanceTitle')} back>
        <EmptyState
          title={t('resultsEmpty')}
          hint={t('resultsEmptyHint')}
          actionLabel={t('back')}
          onAction={() => router.back()}
        />
      </Screen>
    );
  }

  const destination = getPlace(journey.destinationId);

  const steps: GuidanceStep[] = [];
  journey.legs.forEach((leg) => {
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
    steps.push({
      title: `${TRANSPORT_MODE_LABELS[leg.mode][locale]}: ${from}`,
      lines: [
        `${t('boardingPoint')}: ${leg.boardingPoint}`,
        `${t('direction')}: ${leg.direction}`,
      ],
    });
    steps.push({
      title: `${t('getOffAt')}: ${to}`,
      lines: [
        `${legFare} · ${legDuration}`,
        ...(leg.note !== null ? [leg.note] : []),
        ...(leg.walking ? [t('walkNote')] : []),
      ],
    });
  });
  steps.push({
    title: destination?.names[locale] ?? journey.destinationId,
    lines: [t('guidanceNote')],
  });

  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const isLast = stepIndex >= steps.length - 1;

  return (
    <Screen
      title={t('guidanceTitle')}
      demo
      back
      footer={
        <View style={styles.footerRow}>
          {!isLast && (
            <Pressable
              accessibilityRole="button"
              onPress={() => setStepIndex((i) => Math.min(i + 1, steps.length - 1))}
              style={[styles.footerPrimary, { backgroundColor: palette.accent }]}
            >
              <Text style={[styles.primaryText, { color: palette.onAccent, fontSize: scaled(fontSize.md, textScale) }]}>
                {t('nextStep')}
              </Text>
            </Pressable>
          )}
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={[
              isLast ? styles.footerPrimary : styles.footerSecondary,
              isLast
                ? { backgroundColor: palette.accent }
                : { borderColor: palette.border, backgroundColor: palette.surface },
            ]}
          >
            <Text
              style={[
                isLast ? styles.primaryText : styles.secondaryText,
                {
                  color: isLast ? palette.onAccent : palette.text,
                  fontSize: scaled(fontSize.md, textScale),
                },
              ]}
            >
              {t('exitGuidance')}
            </Text>
          </Pressable>
        </View>
      }
    >
      <View style={styles.progressRow}>
        <Text style={[styles.progress, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('stepOf')} {stepIndex + 1} / {steps.length}
        </Text>
        <DemoBadge />
      </View>

      <View style={[styles.stepCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <Text style={[styles.stepTitle, { color: palette.text, fontSize: scaled(fontSize.xxl, textScale) }]}>
          {step.title}
        </Text>
        {step.lines.map((line) => (
          <Text
            key={line}
            style={[styles.stepLine, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}
          >
            {line}
          </Text>
        ))}
      </View>

      <Text style={[styles.note, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('guidanceNote')}
      </Text>
      <Text style={[styles.note, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('demoNotice')}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progress: { fontWeight: '700' },
  stepCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: spacing.xl,
    gap: spacing.md,
  },
  stepTitle: { fontWeight: '800', lineHeight: 36 },
  stepLine: { lineHeight: 24 },
  note: { lineHeight: 20 },
  footerRow: { flexDirection: 'row', gap: spacing.sm },
  footerPrimary: {
    flex: 1,
    minHeight: 52,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerSecondary: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  primaryText: { fontWeight: '800' },
  secondaryText: { fontWeight: '700' },
});
