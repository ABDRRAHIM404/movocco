/**
 * Local persistence for the Movocco Android pilot.
 *
 * Everything here lives on the device only (AsyncStorage). There is no
 * backend yet, so saved journeys do NOT sync anywhere in Level A.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppSettings, SavedJourney } from '../data/types';
import { DEFAULT_SETTINGS } from '../data/types';
import type { SupportedLocale } from '../i18n/strings';

const LANGUAGE_KEY = '@movocco:language';
const SETTINGS_KEY = '@movocco:settings';
const SAVED_JOURNEYS_KEY = '@movocco:saved-journeys';

export async function loadLanguage(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(LANGUAGE_KEY);
  } catch {
    return null;
  }
}

export async function saveLanguage(locale: SupportedLocale): Promise<void> {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, locale);
  } catch {
    // Language preference is best-effort; the app still works without it.
  }
}

export async function loadSettings(): Promise<AppSettings> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    return {
      largeText: parsed.largeText === true,
      lowData: parsed.lowData === true,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Settings are best-effort.
  }
}

export async function loadSavedJourneys(): Promise<SavedJourney[]> {
  try {
    const raw = await AsyncStorage.getItem(SAVED_JOURNEYS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedJourney[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveJourneyEntry(entry: SavedJourney): Promise<SavedJourney[]> {
  const current = await loadSavedJourneys();
  const next = [entry, ...current.filter((s) => s.journeyId !== entry.journeyId)];
  try {
    await AsyncStorage.setItem(SAVED_JOURNEYS_KEY, JSON.stringify(next));
  } catch {
    // Saving is best-effort; the caller still shows the saved state.
  }
  return next;
}

export async function removeSavedJourney(journeyId: string): Promise<SavedJourney[]> {
  const next = (await loadSavedJourneys()).filter((s) => s.journeyId !== journeyId);
  try {
    await AsyncStorage.setItem(SAVED_JOURNEYS_KEY, JSON.stringify(next));
  } catch {
    // Best-effort.
  }
  return next;
}

export async function clearAllLocalData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([LANGUAGE_KEY, SETTINGS_KEY, SAVED_JOURNEYS_KEY]);
  } catch {
    // Best-effort.
  }
}
