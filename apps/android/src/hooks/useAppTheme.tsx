import { useColorScheme, View, type ViewStyle } from 'react-native';
import { paletteFor } from '../theme';
import { useSettings } from '../settings/SettingsContext';

/**
 * Convenience hook for screens/components: palette for the current colour
 * scheme plus the user's text scale. Keeps colour-scheme handling in one
 * place. The user's theme preference (system / light / dark) wins over the
 * device scheme, so dark mode is real, not system-only.
 */
export function useAppTheme() {
  const systemScheme = useColorScheme();
  const { settings, textScale } = useSettings();
  const scheme =
    settings.theme === 'system' ? (systemScheme ?? 'light') : settings.theme;
  return { palette: paletteFor(scheme), scheme, textScale };
}

export function Row({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>{children}</View>
  );
}
