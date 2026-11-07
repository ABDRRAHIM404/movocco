import { StyleSheet, Text, View, type ColorValue } from 'react-native';
import { Tabs } from 'expo-router';
import { fontSize, scaled } from '../../theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useI18n } from '../../i18n/I18nContext';

/**
 * Main tab navigation: Plan · Explore · Saved (chosen design, 2026-11-07).
 * Nearby and Account stay as routes but leave the tab bar: nearby discovery
 * is reachable from Plan/Explore, and account/settings from a secondary
 * menu. Tab glyphs are simple letter tiles for this pilot.
 */
function TabGlyph({ letter, focused, color }: { letter: string; focused: boolean; color: ColorValue }) {
  const { palette, textScale } = useAppTheme();
  return (
    <View
      style={[
        styles.glyph,
        {
          backgroundColor: focused ? color : 'transparent',
          borderColor: color,
        },
      ]}
    >
      <Text
        style={[
          styles.glyphText,
          { color: focused ? palette.onAccent : color, fontSize: scaled(fontSize.sm, textScale) },
        ]}
      >
        {letter}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const { palette, textScale } = useAppTheme();
  const { t } = useI18n();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.accentText,
        tabBarInactiveTintColor: palette.muted,
        tabBarStyle: { backgroundColor: palette.card, borderTopColor: palette.border },
        tabBarLabelStyle: { fontSize: scaled(fontSize.xs, textScale), fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="plan"
        options={{
          title: t('tabPlan'),
          tabBarIcon: ({ focused, color }) => (
            <TabGlyph letter="P" focused={focused} color={color ?? palette.muted} />
          ),
        }}
      />
      <Tabs.Screen
        name="nearby"
        options={{
          title: t('tabNearby'),
          // Hidden from the tab bar; reachable from Plan/Explore.
          href: null,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('tabExplore'),
          tabBarIcon: ({ focused, color }) => (
            <TabGlyph letter="E" focused={focused} color={color ?? palette.muted} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: t('tabSaved'),
          tabBarIcon: ({ focused, color }) => (
            <TabGlyph letter="S" focused={focused} color={color ?? palette.muted} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: t('tabAccount'),
          // Hidden from the tab bar; reachable from Settings.
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  glyph: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyphText: { fontWeight: '800' },
});
