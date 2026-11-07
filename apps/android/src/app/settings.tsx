import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../components/Screen';
import { Toggle } from '../components/Toggle';
import { EmptyState } from '../components/EmptyState';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useI18n } from '../i18n/I18nContext';
import { useSettings } from '../settings/SettingsContext';
import { clearAllLocalData } from '../lib/storage';
import type { SupportedLocale } from '../i18n/strings';
import type { ThemePreference } from '../data/types';

/**
 * Settings: language, theme, accessibility (larger text), low-data mode,
 * account, privacy (clear local data), data reliability, and about.
 */
export default function SettingsScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale, setLocale, availableLocales } = useI18n();
  const { settings, updateSettings } = useSettings();
  const [cleared, setCleared] = useState(false);
  const router = useRouter();

  const themeOptions: { value: ThemePreference; label: string }[] = [
    { value: 'system', label: t('themeSystem') },
    { value: 'light', label: t('themeLight') },
    { value: 'dark', label: t('themeDark') },
  ];

  return (
    <Screen title={t('settings')} back>
      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('language')}
      </Text>
      <View style={{ gap: spacing.sm }}>
        {availableLocales
          .filter((entry) => entry.available)
          .map((entry) => {
            const selected = locale === entry.code;
            return (
              <Pressable
                key={entry.code}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => void setLocale(entry.code as SupportedLocale)}
                style={[
                  styles.row,
                  {
                    backgroundColor: selected ? palette.accentSoft : palette.surface,
                    borderColor: selected ? palette.accent : palette.border,
                  },
                ]}
              >
                <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                  {entry.label} · {entry.englishName}
                </Text>
              </Pressable>
            );
          })}
      </View>

      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('theme')}
      </Text>
      <View style={{ gap: spacing.sm }}>
        {themeOptions.map((option) => {
          const selected = settings.theme === option.value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => void updateSettings({ theme: option.value })}
              style={[
                styles.row,
                {
                  backgroundColor: selected ? palette.accentSoft : palette.surface,
                  borderColor: selected ? palette.accent : palette.border,
                },
              ]}
            >
              <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('accountTitle')}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/(tabs)/account')}
        style={[styles.row, { backgroundColor: palette.surface, borderColor: palette.border }]}
      >
        <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('guest')} ›
        </Text>
      </Pressable>

      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('accessibility')}
      </Text>
      <View style={[styles.row, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
            {t('largeText')}
          </Text>
          <Text style={[styles.rowMeta, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
            {t('largeTextHint')}
          </Text>
        </View>
        <Toggle
          label={t('largeText')}
          value={settings.largeText}
          onChange={(next) => void updateSettings({ largeText: next })}
        />
      </View>

      <View style={[styles.row, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
            {t('lowData')}
          </Text>
          <Text style={[styles.rowMeta, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
            {t('lowDataHint')}
          </Text>
        </View>
        <Toggle
          label={t('lowData')}
          value={settings.lowData}
          onChange={(next) => void updateSettings({ lowData: next })}
        />
      </View>

      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('privacy')}
      </Text>
      <Text style={[styles.body, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('privacyNote')}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          void clearAllLocalData().then(() => setCleared(true));
        }}
        style={[styles.dangerButton, { borderColor: palette.danger }]}
      >
        <Text style={[styles.dangerText, { color: palette.danger, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('clearSavedData')}
        </Text>
      </Pressable>
      {cleared && <EmptyState title={t('clearSavedDataDone')} hint="" />}

      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('dataReliability')}
      </Text>
      <Text style={[styles.body, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('dataReliabilityText')}
      </Text>

      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('about')}
      </Text>
      <Text style={[styles.body, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('version')}: 1.0.0 (Level A pilot — DEMO)
      </Text>
      <Text style={[styles.body, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('agadirOnly')} — {t('agadirOnlyHint')}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { fontWeight: '700' },
  row: {
    minHeight: 56,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  rowTitle: { fontWeight: '700' },
  rowMeta: { lineHeight: 20 },
  body: { lineHeight: 22 },
  dangerButton: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerText: { fontWeight: '700' },
});
