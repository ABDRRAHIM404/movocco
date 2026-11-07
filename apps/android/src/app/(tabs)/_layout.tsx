import { StyleSheet, Text, View, type ColorValue } from 'react-native';
import { Tabs } from 'expo-router';
import { fontSize, scaled } from '../../theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useI18n } from '../../i18n/I18nContext';

/**
 * Main tab navigation: Plan · Nearby · Explore · Saved · Account.
 *
 * Tab glyphs are simple letter tiles for this pilot. They are provisional:
 * final tab iconography is part of the unapproved brand/design work.
 */
function TabGlyph({ letter, focused, color }: { letter: string; focused: boolean; color: ColorValue }) {
  const { textScale } = useAppTheme();
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
          { color: focused ? '#FFFFFF' : color, fontSize: scaled(fontSize.sm, textScale) },
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
          tabBarIcon: ({ focused, color }) => (
            <TabGlyph letter="N" focused={focused} color={color ?? palette.muted} />
          ),
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
          tabBarIcon: ({ focused, color }) => (
            <TabGlyph letter="A" focused={focused} color={color ?? palette.muted} />
          ),
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
