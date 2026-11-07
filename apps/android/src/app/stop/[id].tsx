import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '../../components/Screen';
import { EmptyState } from '../../components/EmptyState';
import { DemoBadge } from '../../components/DemoBadge';
import { MapSchematic } from '../../components/MapSchematic';
import { SourceBadge } from '../../components/SourceBadge';
import { fontSize, scaled, spacing } from '../../theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useI18n } from '../../i18n/I18nContext';
import { useSettings } from '../../settings/SettingsContext';
import { DEMO_JOURNEYS, getPlace } from '../../data/demo';
import { TRANSPORT_MODE_LABELS } from '../../data/types';

/**
 * Stop / hub detail: what the place is, its connections in the demo set,
 * and the honest statement that services and fares are not verified yet.
 */
export default function StopDetailScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale } = useI18n();
  const { settings } = useSettings();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const place = params.id !== undefined ? getPlace(params.id) : undefined;

  if (place === undefined) {
    return (
      <Screen title={t('stopsAndHubs')} back>
        <EmptyState
          title={t('noResults')}
          hint={t('noResultsHint')}
          actionLabel={t('back')}
          onAction={() => router.back()}
        />
      </Screen>
    );
  }

  const connections = DEMO_JOURNEYS.filter(
    (j) => j.legs.some((leg) => leg.fromPlaceId === place.id || leg.toPlaceId === place.id),
  );

  return (
    <Screen title={place.names[locale]} demo back>
      <View style={styles.titleRow}>
        <Text style={[styles.kind, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
          {place.kind}
        </Text>
        <DemoBadge />
      </View>
      <Text style={[styles.description, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
        {place.description[locale]}
      </Text>

      <MapSchematic
        points={[{ place, label: place.names[locale], kind: 'stop' }]}
        lowData={settings.lowData}
      />

      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('connections')}
      </Text>
      {connections.length === 0 ? (
        <EmptyState title={t('resultsEmpty')} hint={t('noVerifiedDataHint')} />
      ) : (
        <View style={{ gap: spacing.sm }}>
          {connections.map((journey) => {
            const from = getPlace(journey.originId)?.names[locale] ?? journey.originId;
            const to = getPlace(journey.destinationId)?.names[locale] ?? journey.destinationId;
            const modes = journey.legs
              .map((leg) => TRANSPORT_MODE_LABELS[leg.mode][locale])
              .filter((v, i, a) => a.indexOf(v) === i)
              .join(' · ');
            return (
              <View
                key={journey.id}
                style={[styles.row, { backgroundColor: palette.surface, borderColor: palette.border }]}
              >
                <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                  {from} → {to}
                </Text>
                <Text style={[styles.rowMeta, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
                  {modes}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      <SourceBadge
        source={{
          label: 'Movocco demo dataset',
          url: null,
          evidence: 'demo',
          measurement: 'estimated',
          lastReviewedOn: null,
        }}
      />
      <Text style={[styles.footnote, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('noVerifiedDataHint')}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kind: {},
  description: { lineHeight: 24 },
  section: { fontWeight: '700' },
  row: { borderWidth: 1, borderRadius: 12, padding: spacing.md, gap: 2 },
  rowTitle: { fontWeight: '700' },
  rowMeta: {},
  footnote: { lineHeight: 20 },
});
