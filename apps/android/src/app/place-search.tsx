import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '../components/Screen';
import { EmptyState } from '../components/EmptyState';
import { DemoBadge } from '../components/DemoBadge';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useI18n } from '../i18n/I18nContext';
import { searchPlaces } from '../data/demo';
import { setDestination, setOrigin } from '../lib/planSelection';

/**
 * Place search / autocomplete over the local (demo) place index.
 * Query param `field` is `origin` or `destination`.
 */
export default function PlaceSearchScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale } = useI18n();
  const router = useRouter();
  const params = useLocalSearchParams<{ field?: string }>();
  const field = params.field === 'destination' ? 'destination' : 'origin';
  const [query, setQuery] = useState('');

  const results = useMemo(() => searchPlaces(query), [query]);

  const title = field === 'destination' ? t('chooseDestination') : t('chooseOrigin');

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

      {results.length === 0 ? (
        <EmptyState title={t('noResults')} hint={t('noResultsHint')} />
      ) : (
        <View style={{ gap: spacing.sm }}>
          {results.map((place) => (
            <Pressable
              key={place.id}
              accessibilityRole="button"
              onPress={() => {
                if (field === 'destination') {
                  setDestination(place);
                } else {
                  setOrigin(place);
                }
                router.back();
              }}
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
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
  },
  row: { borderWidth: 1, borderRadius: 12, padding: spacing.md, gap: 2 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.sm },
  rowTitle: { fontWeight: '700', flex: 1 },
  rowMeta: { lineHeight: 20 },
});
