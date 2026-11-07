import { useColorScheme, View, type ViewStyle } from 'react-native';
import { paletteFor } from '../theme';
import { useSettings } from '../settings/SettingsContext';

/**
 * Convenience hook for screens/components: palette for the current colour
 * scheme plus the user's text scale. Keeps colour-scheme handling in one place.
 */
export function useAppTheme() {
  const scheme = useColorScheme();
  const { textScale } = useSettings();
  return { palette: paletteFor(scheme), scheme: scheme ?? 'light', textScale };
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
