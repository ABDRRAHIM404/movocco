import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '../components/Screen';
import { EmptyState } from '../components/EmptyState';
import { DemoBadge } from '../components/DemoBadge';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useI18n } from '../i18n/I18nContext';
import { DEMO_PLACES, POPULAR_PLACE_IDS, getPlace, searchPlaces } from '../data/demo';
import { setDestination, setOrigin } from '../lib/planSelection';
import { loadRecentSearches } from '../lib/storage';
import type { Place } from '../data/types';

/**
 * Place search / autocomplete over the local (demo) place index.
 * Query param `field` is `origin` or `destination`.
 *
 * With an empty query the list is grouped (chosen design): Recent, then
 * Popular, then Places in Agadir. Typing filters the whole demo index.
 */
export default function PlaceSearchScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale } = useI18n();
  const router = useRouter();
  const params = useLocalSearchParams<{ field?: string }>();
  const field = params.field === 'destination' ? 'destination' : 'origin';
  const [query, setQuery] = useState('');
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    void loadRecentSearches().then((entries) => {
      const ids: string[] = [];
      for (const entry of entries) {
        for (const id of [entry.originId, entry.destinationId]) {
          if (!ids.includes(id)) ids.push(id);
        }
      }
      setRecentIds(ids);
    });
  }, []);

  const results = useMemo(() => searchPlaces(query), [query]);
  const isSearching = query.trim().length > 0;

  const title = field === 'destination' ? t('chooseDestination') : t('chooseOrigin');

  const pick = (place: Place) => {
    if (field === 'destination') {
      setDestination(place);
    } else {
      setOrigin(place);
    }
    router.back();
  };

  const renderRow = (place: Place) => (
    <Pressable
      key={place.id}
      accessibilityRole="button"
      onPress={() => pick(place)}
      style={[styles.row, { backgroundColor: palette.surface, borderColor: palette.border }]}
    >
      <View style={styles.rowTop}>
        <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
          {place.names[locale]}
        </Text>
        <DemoBadge />
      </View>
      <Text style={[styles.rowMeta, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {place.kind} · {place.description[locale]}
      </Text>
    </Pressable>
  );

  const recentPlaces = recentIds
    .map((id) => getPlace(id))
    .filter((p): p is Place => p !== undefined);
  const popularPlaces = POPULAR_PLACE_IDS.map((id) => getPlace(id)).filter(
    (p): p is Place => p !== undefined,
  );

  return (
    <Screen title={title} demo back>
      <TextInput
        accessibilityLabel={t('searchPlaceholder')}
        placeholder={t('searchPlaceholder')}
        placeholderTextColor={palette.muted}
        value={query}
        onChangeText={setQuery}
        autoFocus
        autoCorrect={false}
        style={[
          styles.input,
          {
            backgroundColor: palette.surface,
            borderColor: palette.border,
            color: palette.text,
            fontSize: scaled(fontSize.md, textScale),
          },
        ]}
      />

      {isSearching ? (
        results.length === 0 ? (
          <EmptyState title={t('noMatchingPlace')} hint={t('agadirOnlyHint')} />
        ) : (
          <View style={{ gap: spacing.sm }}>{results.map(renderRow)}</View>
        )
      ) : (
        <View style={{ gap: spacing.lg }}>
          {recentPlaces.length > 0 && (
            <View style={{ gap: spacing.sm }}>
              <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
                {t('recentSearches')}
              </Text>
              {recentPlaces.map(renderRow)}
            </View>
          )}
          <View style={{ gap: spacing.sm }}>
            <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
              {t('popular')}
            </Text>
            {popularPlaces.map(renderRow)}
          </View>
          <View style={{ gap: spacing.sm }}>
            <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
              {t('placesInAgadir')}
            </Text>
            {DEMO_PLACES.map(renderRow)}
          </View>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: spacing.lg,
  },
  section: { fontWeight: '700' },
  row: { borderWidth: 1, borderRadius: 16, padding: spacing.md, gap: 2 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.sm },
  rowTitle: { fontWeight: '700', flex: 1 },
  rowMeta: { lineHeight: 20 },
});
