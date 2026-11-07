import { Image, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import logoDark from '../../assets/brand/logo-dark.png';
import logoLight from '../../assets/brand/logo-light.png';

/**
 * Movocco wordmark from the supplied brand files (copied unchanged from
 * main: public/header/logo-dark.png and logo-light.png).
 * - logo-dark.png (white wordmark) is for dark surfaces.
 * - logo-light.png (dark wordmark, transparent) is for light surfaces.
 */
export function BrandHeader({ height = 44 }: { height?: number }) {
  const { scheme } = useAppTheme();
  const source = scheme === 'dark' ? logoDark : logoLight;
  return (
    <View style={styles.wrap}>
      <Image
        source={source}
        style={{ height, width: height * 4.4 }}
        resizeMode="contain"
        accessibilityLabel="Movocco"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'flex-start' },
});
