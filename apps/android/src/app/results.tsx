import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '../components/Screen';
import { EmptyState } from '../components/EmptyState';
import { JourneyCard } from '../components/JourneyCard';
import { DemoBadge } from '../components/DemoBadge';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useI18n } from '../i18n/I18nContext';
import { findJourneys, getPlace } from '../data/demo';
import { rankJourneys } from '../lib/journey';

/**
 * Journey results: options ranked cheapest / fastest / fewest transfers
 * ONLY where the data supports the comparison. Incomplete data refuses the
 * ranking and says so.
 */
export default function ResultsScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale } = useI18n();
  const router = useRouter();
  const params = useLocalSearchParams<{ origin?: string; destination?: string }>();
  const origin = params.origin !== undefined ? getPlace(params.origin) : undefined;
  const destination =
    params.destination !== undefined ? getPlace(params.destination) : undefined;

  if (origin === undefined || destination === undefined) {
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

  const journeys = findJourneys(origin.id, destination.id);
  const ranking = rankJourneys(journeys);

  return (
    <Screen title={t('resultsTitle')} demo back>
      <Text style={[styles.route, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {origin.names[locale]} → {destination.names[locale]}
      </Text>

      <View style={[styles.notice, { backgroundColor: palette.demoBackground, borderColor: palette.demo }]}>
        <DemoBadge />
        <Text style={[styles.noticeText, { color: palette.demo, fontSize: scaled(fontSize.sm, textScale) }]}>
          {t('demoJourneyNotice')}
        </Text>
      </View>

      {ranking.incomplete && (
        <View style={[styles.warn, { backgroundColor: palette.surface, borderColor: palette.border }]}>
          <Text style={[styles.warnTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
            {t('cannotRank')}
          </Text>
          <Text style={[styles.warnText, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
            {t('cannotRankHint')}
          </Text>
        </View>
      )}

      {journeys.length === 0 ? (
        <EmptyState title={t('resultsEmpty')} hint={t('resultsEmptyHint')} />
      ) : (
        <View style={{ gap: spacing.md }}>
          {journeys.map((journey) => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              originName={origin.names[locale]}
              destinationName={destination.names[locale]}
              badges={{
                cheapest: ranking.cheapestId === journey.id,
                fastest: ranking.fastestId === journey.id,
                fewest: ranking.fewestTransfersId === journey.id,
              }}
              onPress={() =>
                router.push({ pathname: '/journey/[id]', params: { id: journey.id } })
              }
            />
          ))}
        </View>
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
  warn: { borderWidth: 1, borderRadius: 12, padding: spacing.md, gap: spacing.xs },
  warnTitle: { fontWeight: '700' },
  warnText: { lineHeight: 20 },
});
