import { Pressable, StyleSheet, Text, View } from 'react-native';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';

/** Accessible on/off toggle (44pt minimum tap target). */
export function Toggle({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  const { palette, textScale } = useAppTheme();
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={label}
      onPress={() => onChange(!value)}
      style={[
        styles.track,
        { backgroundColor: value ? palette.accent : palette.border, borderColor: palette.border },
      ]}
    >
      <View
        style={[
          styles.thumb,
          {
            backgroundColor: palette.card,
            alignSelf: value ? 'flex-end' : 'flex-start',
          },
        ]}
      />
      <Text style={[styles.state, { color: palette.onAccent, fontSize: scaled(fontSize.xs, textScale) }]}>
        {value ? 'ON' : 'OFF'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 72,
    minHeight: 44,
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  state: { fontWeight: '800' },
});
