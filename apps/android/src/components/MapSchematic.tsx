import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useI18n } from '../i18n/I18nContext';
import type { Place } from '../data/types';

/**
 * Schematic map for the Level A pilot.
 *
 * A live MapLibre integration needs a native build (prebuild / dev client)
 * and is NOT claimed here. This component draws an approximate schematic of
 * the demo places and always ships with a full text/list fallback, which is
 * the view that stays usable when maps fail, in low-data mode, or with a
 * screen reader. Positions are approximate (DEMO).
 */
export interface MapPoint {
  place: Place;
  label: string;
  kind: 'origin' | 'destination' | 'stop';
}

const MIN_LAT = 30.39;
const MAX_LAT = 30.44;
const MIN_LON = -9.63;
const MAX_LON = -9.55;

function project(lat: number, lon: number): { x: number; y: number } {
  const x = ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * 100;
  const y = (1 - (lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * 100;
  return { x: Math.min(92, Math.max(8, x)), y: Math.min(88, Math.max(12, y)) };
}

export function MapSchematic({
  points,
  lowData = false,
}: {
  points: MapPoint[];
  lowData?: boolean;
}) {
  const { palette, textScale } = useAppTheme();
  const { t } = useI18n();
  const [view, setView] = useState<'map' | 'list'>(lowData ? 'list' : 'map');

  const projected = points.map((p) => ({ ...p, ...project(p.place.lat, p.place.lon) }));

  // Dots along the straight connectors between consecutive points.
  const connectors: { x: number; y: number }[] = [];
  for (let i = 0; i < projected.length - 1; i += 1) {
    const a = projected[i];
    const b = projected[i + 1];
    for (let step = 1; step < 8; step += 1) {
      connectors.push({
        x: a.x + ((b.x - a.x) * step) / 8,
        y: a.y + ((b.y - a.y) * step) / 8,
      });
    }
  }

  return (
    <View style={{ gap: spacing.sm }}>
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: view === 'map' }}
          onPress={() => setView('map')}
          style={[
            styles.toggle,
            {
              backgroundColor: view === 'map' ? palette.accent : palette.surface,
              borderColor: palette.border,
            },
          ]}
        >
          <Text
            style={{
              color: view === 'map' ? palette.onAccent : palette.text,
              fontSize: scaled(fontSize.sm, textScale),
              fontWeight: '700',
            }}
          >
            {t('mapView')}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: view === 'list' }}
          onPress={() => setView('list')}
          style={[
            styles.toggle,
            {
              backgroundColor: view === 'list' ? palette.accent : palette.surface,
              borderColor: palette.border,
            },
          ]}
        >
          <Text
            style={{
              color: view === 'list' ? palette.onAccent : palette.text,
              fontSize: scaled(fontSize.sm, textScale),
              fontWeight: '700',
            }}
          >
            {t('listView')}
          </Text>
        </Pressable>
      </View>

      {view === 'map' ? (
        <View
          accessibilityLabel={t('schematicMapNote')}
          style={[styles.map, { backgroundColor: palette.surface, borderColor: palette.border }]}
        >
          {connectors.map((c, i) => (
            <View
              key={`dot-${i}`}
              style={[
                styles.dot,
                { left: `${c.x}%`, top: `${c.y}%`, backgroundColor: palette.accent },
              ]}
            />
          ))}
          {projected.map((p, i) => (
            <View
              key={p.place.id}
              style={[styles.marker, { left: `${p.x}%`, top: `${p.y}%` }]}
            >
              <View
                style={[
                  styles.markerDot,
                  {
                    backgroundColor:
                      p.kind === 'origin'
                        ? palette.success
                        : p.kind === 'destination'
                          ? palette.accent
                          : palette.info,
                  },
                ]}
              >
                <Text style={[styles.markerNumber, { fontSize: scaled(fontSize.xs, textScale) }]}>
                  {i + 1}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={[styles.markerLabel, { color: palette.text, fontSize: scaled(fontSize.xs, textScale) }]}
              >
                {p.label}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={[styles.list, { backgroundColor: palette.surface, borderColor: palette.border }]}>
          {projected.map((p, i) => (
            <Text
              key={p.place.id}
              style={[styles.listRow, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}
            >
              {i + 1}. {p.label}
              {p.kind === 'origin' ? ' — ' : p.kind === 'destination' ? ' — ' : ' — '}
              {p.kind}
            </Text>
          ))}
        </View>
      )}
      <Text style={[styles.note, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('schematicMapNote')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toggle: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderRadius: 8,
  },
  map: {
    height: 220,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  dot: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    marginLeft: -2,
    marginTop: -2,
    opacity: 0.6,
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    marginLeft: -14,
    marginTop: -14,
    width: 28,
  },
  markerDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerNumber: { color: '#FFFFFF', fontWeight: '800' },
  markerLabel: {
    marginTop: 2,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  list: { borderWidth: 1, borderRadius: 12, padding: spacing.md, gap: spacing.sm },
  listRow: { lineHeight: 22 },
  note: { lineHeight: 20 },
});
