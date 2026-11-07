import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Screen } from '../../components/Screen';
import { EmptyState } from '../../components/EmptyState';
import { DemoBadge } from '../../components/DemoBadge';
import { fontSize, scaled, spacing } from '../../theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useI18n } from '../../i18n/I18nContext';
import { DEMO_PLACES } from '../../data/demo';
import type { Place } from '../../data/types';

type NearbyState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'denied' }
  | { kind: 'unavailable' }
  | { kind: 'ready'; lat: number; lon: number };

function haversineKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLon = toRad(bLon - aLon);
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/**
 * Nearby tab: GPS-based discovery with honest fallbacks.
 * - Permission denied → manual origin picker, no GPS use.
 * - GPS unavailable → full list of Agadir hubs, distances unknown.
 * Distances use approximate demo coordinates and are labelled as such.
 */
export default function NearbyScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale } = useI18n();
  const router = useRouter();
  const [state, setState] = useState<NearbyState>({ kind: 'idle' });

  const requestLocation = async () => {
    setState({ kind: 'loading' });
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        setState({ kind: 'denied' });
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setState({
        kind: 'ready',
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    } catch {
      setState({ kind: 'unavailable' });
    }
  };

  const hubs = DEMO_PLACES.filter((p) => p.kind === 'hub' || p.kind === 'station');
  const sorted =
    state.kind === 'ready'
      ? [...hubs].sort(
          (a, b) =>
            haversineKm(state.lat, state.lon, a.lat, a.lon) -
            haversineKm(state.lat, state.lon, b.lat, b.lon),
        )
      : hubs;

  const distanceText = (place: Place): string | null => {
    if (state.kind !== 'ready') return null;
    const km = haversineKm(state.lat, state.lon, place.lat, place.lon);
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
  };

  return (
    <Screen title={t('nearbyTitle')} demo>
      <Text style={[styles.subtitle, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('nearbySubtitle')}
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => void requestLocation()}
        style={[styles.primary, { backgroundColor: palette.accent }]}
      >
        <Text style={[styles.primaryText, { color: palette.onAccent, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('useMyLocation')}
        </Text>
      </Pressable>

      {state.kind === 'loading' && (
        <Text style={[styles.status, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('loading')}
        </Text>
      )}

      {state.kind === 'denied' && (
        <EmptyState
          title={t('gpsDenied')}
          hint={t('gpsDeniedHint')}
          actionLabel={t('chooseOriginManually')}
          onAction={() => router.push('/(tabs)/plan')}
        />
      )}

      {state.kind === 'unavailable' && (
        <EmptyState title={t('gpsUnavailable')} hint={t('gpsUnavailableHint')} />
      )}

      <View style={{ gap: spacing.sm }}>
        <View style={styles.sectionRow}>
          <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
            {t('stopsAndHubs')}
          </Text>
          <DemoBadge />
        </View>
        {sorted.length === 0 ? (
          <EmptyState title={t('nearbyEmpty')} hint={t('agadirOnlyHint')} />
        ) : (
          sorted.map((place) => {
            const distance = distanceText(place);
            return (
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
                  {place.kind}
                  {distance !== null ? ` · ~${distance}` : ''}
                </Text>
              </Pressable>
            );
          })
        )}
      </View>

      <Text style={[styles.footnote, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('demoNotice')}
      </Text>
      <Text style={[styles.footnote, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('privacyNote')}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: { lineHeight: 24 },
  primary: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { fontWeight: '800' },
  status: {},
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  section: { fontWeight: '700' },
  row: { borderWidth: 1, borderRadius: 12, padding: spacing.md, gap: 2 },
  rowTitle: { fontWeight: '700' },
  rowMeta: {},
  footnote: { lineHeight: 20 },
});
