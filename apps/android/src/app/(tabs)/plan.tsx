import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Screen } from '../../components/Screen';
import { BrandHeader } from '../../components/BrandHeader';
import { DemoBadge } from '../../components/DemoBadge';
import { fontSize, scaled, spacing } from '../../theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useI18n } from '../../i18n/I18nContext';
import {
  clearSelection,
  getSelection,
  setDestination,
  setOrigin,
  swapSelection,
} from '../../lib/planSelection';
import { getPlace } from '../../data/demo';
import { loadRecentSearches, recordRecentSearch, type RecentSearch } from '../../lib/storage';
import type { Place } from '../../data/types';

/**
 * Home / Plan tab: origin and destination search for Agadir journeys.
 * Public planning needs no account. Demo data is labelled on the screen.
 * Follows MOVOCCO_APK_DESIGN_4_7eff.md: "Where are you going?" heading,
 * From/To with swap in one card, orange "Find routes" button, at most two
 * recent searches, and secondary links to Nearby and Settings.
 */
export default function PlanScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale } = useI18n();
  const router = useRouter();
  const [selection, setSelection] = useState<{ origin: Place | null; destination: Place | null }>({
    origin: null,
    destination: null,
  });
  const [recent, setRecent] = useState<RecentSearch[]>([]);

  // Re-read the shared draft whenever this tab regains focus (e.g. after
  // picking a place in the search screen).
  useFocusEffect(
    useCallback(() => {
      setSelection(getSelection());
      void loadRecentSearches().then(setRecent);
    }, []),
  );

  const { origin, destination } = selection;
  const canSearch =
    origin !== null && destination !== null && origin.id !== destination.id;

  const placeName = (place: Place | null) =>
    place === null ? null : place.names[locale];

  const openSearch = (field: 'origin' | 'destination') => {
    router.push({ pathname: '/place-search', params: { field } });
  };

  const goToResults = (from: Place, to: Place) => {
    void recordRecentSearch({
      originId: from.id,
      destinationId: to.id,
      originName: from.names[locale],
      destinationName: to.names[locale],
    }).then(setRecent);
    router.push({
      pathname: '/results',
      params: { origin: from.id, destination: to.id },
    });
  };

  const applyRecent = (entry: RecentSearch) => {
    const from = getPlace(entry.originId);
    const to = getPlace(entry.destinationId);
    if (from === undefined || to === undefined) return;
    setOrigin(from);
    setDestination(to);
    setSelection({ origin: from, destination: to });
    goToResults(from, to);
  };

  return (
    <Screen demo>
      <BrandHeader />
      <Text style={[styles.title, { color: palette.text, fontSize: scaled(fontSize.xxl, textScale) }]}>
        {t('planTitle')}
      </Text>
      <Text style={[styles.subtitle, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('planSubtitle')}
      </Text>

      <View style={[styles.notice, { backgroundColor: palette.demoBackground, borderColor: palette.demo }]}>
        <DemoBadge />
        <Text style={[styles.noticeText, { color: palette.demo, fontSize: scaled(fontSize.sm, textScale) }]}>
          {t('demoNotice')}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <Text style={[styles.label, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('origin')}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => openSearch('origin')}
          style={[styles.field, { backgroundColor: palette.background, borderColor: palette.border }]}
        >
          <Text style={[styles.fieldText, { color: origin ? palette.text : palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
            {placeName(origin) ?? t('chooseOrigin')}
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('swap')}
          onPress={() => {
            swapSelection();
            setSelection(getSelection());
          }}
          style={[styles.swap, { borderColor: palette.border }]}
        >
          <Text style={[styles.swapText, { color: palette.accentText, fontSize: scaled(fontSize.md, textScale) }]}>
            ⇅ {t('swap')}
          </Text>
        </Pressable>

        <Text style={[styles.label, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('destination')}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => openSearch('destination')}
          style={[styles.field, { backgroundColor: palette.background, borderColor: palette.border }]}
        >
          <Text style={[styles.fieldText, { color: destination ? palette.text : palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
            {placeName(destination) ?? t('chooseDestination')}
          </Text>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={!canSearch}
        onPress={() => {
          if (origin !== null && destination !== null) {
            goToResults(origin, destination);
          }
        }}
        style={[
          styles.searchButton,
          { backgroundColor: canSearch ? palette.accent : palette.border },
        ]}
      >
        <Text style={[styles.searchText, { color: palette.onAccent, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('searchJourneys')}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => {
          clearSelection();
          setSelection(getSelection());
        }}
        style={styles.clear}
      >
        <Text style={[styles.clearText, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('clearSearch')}
        </Text>
      </Pressable>

      {recent.length > 0 && (
        <View style={{ gap: spacing.sm }}>
          <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
            {t('recentSearches')}
          </Text>
          {recent.map((entry) => (
            <Pressable
              key={`${entry.originId}-${entry.destinationId}`}
              accessibilityRole="button"
              onPress={() => applyRecent(entry)}
              style={[styles.recentRow, { backgroundColor: palette.surface, borderColor: palette.border }]}
            >
              <Text style={[styles.recentText, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                {entry.originName} → {entry.destinationName}
              </Text>
              <DemoBadge />
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.linksRow}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/(tabs)/nearby')}
          style={[styles.link, { borderColor: palette.border }]}
        >
          <Text style={[styles.linkText, { color: palette.accentText, fontSize: scaled(fontSize.md, textScale) }]}>
            {t('nearbyTransport')}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/settings')}
          style={[styles.link, { borderColor: palette.border }]}
        >
          <Text style={[styles.linkText, { color: palette.accentText, fontSize: scaled(fontSize.md, textScale) }]}>
            {t('settings')}
          </Text>
        </Pressable>
      </View>

      <Text style={[styles.footnote, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('agadirOnly')} — {t('agadirOnlyHint')}
      </Text>
      <Text style={[styles.footnote, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('noVerifiedDataHint')}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontWeight: '800' },
  subtitle: { lineHeight: 24 },
  notice: {
    borderWidth: 1,
    borderRadius: 20,
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  noticeText: { lineHeight: 20 },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  label: { fontWeight: '700' },
  field: {
    minHeight: 56,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  fieldText: { fontWeight: '600' },
  swap: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapText: { fontWeight: '700' },
  searchButton: {
    minHeight: 52,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  searchText: { fontWeight: '800' },
  clear: { minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  clearText: { fontWeight: '600' },
  section: { fontWeight: '700' },
  recentRow: {
    minHeight: 56,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  recentText: { fontWeight: '600', flex: 1 },
  linksRow: { flexDirection: 'row', gap: spacing.sm },
  link: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: { fontWeight: '700' },
  footnote: { lineHeight: 20 },
});
