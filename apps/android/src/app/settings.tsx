import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { Toggle } from '../components/Toggle';
import { EmptyState } from '../components/EmptyState';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useI18n } from '../i18n/I18nContext';
import { useSettings } from '../settings/SettingsContext';
import { clearAllLocalData } from '../lib/storage';
import type { SupportedLocale } from '../i18n/strings';

/**
 * Settings: language, accessibility (larger text), low-data mode, privacy
 * (clear local data), and about / backend status.
 */
export default function SettingsScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale, setLocale, availableLocales } = useI18n();
  const { settings, updateSettings } = useSettings();
  const [cleared, setCleared] = useState(false);

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
    borderRadius: 12,
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
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerText: { fontWeight: '700' },
});
