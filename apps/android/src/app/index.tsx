import { Redirect } from 'expo-router';
import { useI18n } from '../i18n/I18nContext';

/**
 * Entry route: users who already chose a language go straight to planning;
 * everyone else gets the welcome / language screen first.
 */
export default function Index() {
  const { hasChosenLanguage } = useI18n();
  if (hasChosenLanguage) {
    return <Redirect href="/(tabs)/plan" />;
  }
  return <Redirect href="/welcome" />;
}
