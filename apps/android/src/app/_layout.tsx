import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
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
 */
function SplashView() {
  return (
    <View style={styles.splash}>
      <Image
        source={brandIcon}
        style={styles.splashIcon}
        resizeMode="contain"
        accessibilityLabel="Movocco"
      />
      <Text style={styles.splashText}>Movocco</Text>
      <Text style={styles.splashSub}>Agadir pilot · DEMO</Text>
    </View>
  );
}

export default function RootLayout() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (!splashDone) {
    return (
      <>
        <StatusBar style="light" />
        <SplashView />
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
    backgroundColor: '#0A1526',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  splashIcon: { width: 120, height: 120 },
  splashText: { color: '#FFFFFF', fontSize: scaled(fontSize.xxl, 1), fontWeight: '800' },
  splashSub: { color: '#A8B3C5', fontSize: scaled(fontSize.md, 1) },
});
