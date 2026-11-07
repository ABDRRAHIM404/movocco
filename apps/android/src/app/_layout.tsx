import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Image, StyleSheet, Text } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nProvider } from '../i18n/I18nContext';
import { SettingsProvider } from '../settings/SettingsContext';
import brandIcon from '../../assets/brand/icon.png';
import { fontSize, scaled } from '../theme';

/**
 * Root layout for the Movocco Android pilot.
 *
 * Shows a brief brand splash (supplied nav icon), then the router stack.
 * The splash is in-app only; the native splash is configured in app.json.
 * The splash respects reduced motion: no fade animation and a shorter
 * display time when the user has reduced motion enabled.
 */
function SplashView({ animate }: { animate: boolean }) {
  const [opacity] = useState(() => new Animated.Value(animate ? 0 : 1));

  useEffect(() => {
    if (!animate) return undefined;
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [animate, opacity]);

  return (
    <Animated.View style={[styles.splash, { opacity }]}>
      <Image
        source={brandIcon}
        style={styles.splashIcon}
        resizeMode="contain"
        accessibilityLabel="Movocco"
      />
      <Text style={styles.splashText}>Movocco</Text>
      <Text style={styles.splashSub}>Agadir pilot · DEMO</Text>
    </Animated.View>
  );
}

export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (cancelled) return;
      setReduceMotion(enabled);
      // Short splash (0.8–1.5s per the design); shorter when reduced motion.
      timer = setTimeout(() => setSplashDone(true), enabled ? 400 : 1200);
    });
    return () => {
      cancelled = true;
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  if (!splashDone) {
    return (
      <>
        <StatusBar style="light" />
        <SplashView animate={!reduceMotion} />
      </>
    );
  }

  return (
    <I18nProvider>
      <SettingsProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="place-search" />
          <Stack.Screen name="results" />
          <Stack.Screen name="journey/[id]" />
          <Stack.Screen name="guidance/[id]" />
          <Stack.Screen name="stop/[id]" />
          <Stack.Screen name="saved/[id]" />
          <Stack.Screen name="settings" />
        </Stack>
      </SettingsProvider>
    </I18nProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#0D1826',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  splashIcon: { width: 120, height: 120 },
  splashText: { color: '#F5F8FD', fontSize: scaled(fontSize.xxl, 1), fontWeight: '800' },
  splashSub: { color: '#A9BAC9', fontSize: scaled(fontSize.md, 1) },
});
