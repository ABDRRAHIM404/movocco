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
  swapSelection,
} from '../../lib/planSelection';
import type { Place } from '../../data/types';

/**
 * Home / Plan tab: origin and destination search for Agadir journeys.
 * Public planning needs no account. Demo data is labelled on the screen.
 */
export default function PlanScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale } = useI18n();
  const router = useRouter();
  const [selection, setSelection] = useState<{ origin: Place | null; destination: Place | null }>({
    origin: null,
    destination: null,
  });

  // Re-read the shared draft whenever this tab regains focus (e.g. after
  // picking a place in the search screen).
  useFocusEffect(
    useCallback(() => {
      setSelection(getSelection());
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

      <View style={{ gap: spacing.sm }}>
        <Text style={[styles.label, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('origin')}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => openSearch('origin')}
          style={[styles.field, { backgroundColor: palette.surface, borderColor: palette.border }]}
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
          style={[styles.field, { backgroundColor: palette.surface, borderColor: palette.border }]}
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
            router.push({
              pathname: '/results',
              params: { origin: origin.id, destination: destination.id },
            });
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
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  noticeText: { lineHeight: 20 },
  label: { fontWeight: '700' },
  field: {
    minHeight: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  fieldText: { fontWeight: '600' },
  swap: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapText: { fontWeight: '700' },
  searchButton: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  searchText: { fontWeight: '800' },
  clear: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  clearText: { fontWeight: '600' },
  footnote: { lineHeight: 20 },
});
