import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as Localization from 'expo-localization';
import { LOCALES, STRINGS, type Locale, type StringKey, type SupportedLocale } from './strings';
import { loadLanguage, saveLanguage } from '../lib/storage';

interface I18nValue {
  locale: SupportedLocale;
  /** Locale chosen by the user (null until they pick one or skip). */
  hasChosenLanguage: boolean;
  t: (key: StringKey) => string;
  setLocale: (locale: SupportedLocale) => Promise<void>;
  availableLocales: typeof LOCALES;
}

const I18nContext = createContext<I18nValue | null>(null);

function deviceLocale(): SupportedLocale {
  const locales = Localization.getLocales();
  const tag = locales[0]?.languageTag?.toLowerCase() ?? '';
  if (tag.startsWith('fr')) return 'fr';
  return 'en';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>('en');
  const [ready, setReady] = useState(false);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const saved = await loadLanguage();
      if (cancelled) return;
      if (saved === 'en' || saved === 'fr') {
        setLocaleState(saved);
        setHasChosenLanguage(true);
      } else {
        setLocaleState(deviceLocale());
      }
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setLocale = useCallback(async (next: SupportedLocale) => {
    setLocaleState(next);
    setHasChosenLanguage(true);
    await saveLanguage(next);
  }, []);

  const t = useCallback(
    (key: StringKey) => STRINGS[locale][key] ?? STRINGS.en[key] ?? key,
    [locale],
  );

  const value = useMemo<I18nValue>(
    () => ({ locale, hasChosenLanguage, t, setLocale, availableLocales: LOCALES }),
    [locale, hasChosenLanguage, t, setLocale],
  );

  // Hold the splash screen until the saved language is known, so the app
  // never flashes the wrong language.
  if (!ready) return null;
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}

export type { Locale };
