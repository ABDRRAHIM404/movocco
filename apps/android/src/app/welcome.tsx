import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../components/Screen';
import { BrandHeader } from '../components/BrandHeader';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useI18n } from '../i18n/I18nContext';
import type { SupportedLocale } from '../i18n/strings';

/**
 * Welcome / language selection. English and French are available in Level A;
 * the other five Movocco languages are listed as planned, not dropped.
 * "Skip" continues with the device language and remembers the choice.
 */
export default function WelcomeScreen() {
  const { palette, textScale } = useAppTheme();
  const { t, locale, setLocale, availableLocales } = useI18n();
  const router = useRouter();
  const [selected, setSelected] = useState<SupportedLocale>(locale);

  const choose = (code: SupportedLocale) => {
    setSelected(code);
    void setLocale(code);
  };

  const proceed = () => {
    router.replace('/(tabs)/plan');
  };

  return (
    <Screen>
      <BrandHeader height={52} />
      <Text style={[styles.title, { color: palette.text, fontSize: scaled(fontSize.xxl, textScale) }]}>
        {t('welcomeTitle')}
      </Text>
      <Text style={[styles.subtitle, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('welcomeSubtitle')}
      </Text>
      <Text style={[styles.section, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {t('chooseLanguage')}
      </Text>
      <View style={{ gap: spacing.sm }}>
        {availableLocales.map((entry) => {
          const isAvailable = entry.available;
          const isSelected = isAvailable && selected === entry.code;
          return (
            <Pressable
              key={entry.code}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected, disabled: !isAvailable }}
              disabled={!isAvailable}
              onPress={() => {
                if (isAvailable) choose(entry.code as SupportedLocale);
              }}
              style={[
                styles.languageRow,
                {
                  backgroundColor: isSelected ? palette.accentSoft : palette.surface,
                  borderColor: isSelected ? palette.accent : palette.border,
                  opacity: isAvailable ? 1 : 0.6,
                },
              ]}
            >
              <Text style={[styles.languageLabel, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                {entry.label} · {entry.englishName}
              </Text>
              {!isAvailable && (
                <Text style={[styles.soon, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
                  {t('comingSoon')}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={proceed}
        style={[styles.primary, { backgroundColor: palette.accent }]}
      >
        <Text style={[styles.primaryText, { color: palette.onAccent, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('continue')}
        </Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={proceed} style={styles.skip}>
        <Text style={[styles.skipText, { color: palette.accentText, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('skip')}
        </Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontWeight: '800' },
  subtitle: { lineHeight: 24 },
  section: { fontWeight: '700', marginTop: spacing.sm },
  languageRow: {
    minHeight: 56,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    gap: 2,
  },
  languageLabel: { fontWeight: '600' },
  soon: {},
  primary: {
    minHeight: 52,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  primaryText: { fontWeight: '800' },
  skip: { minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  skipText: { fontWeight: '700' },
});
