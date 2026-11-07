import { Pressable, StyleSheet, Text, View } from 'react-native';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';

interface EmptyStateProps {
  title: string;
  hint: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** Friendly empty / unavailable / error state with an optional action. */
export function EmptyState({ title, hint, actionLabel, onAction }: EmptyStateProps) {
  const { palette, textScale } = useAppTheme();
  return (
    <View
      style={[styles.box, { backgroundColor: palette.surface, borderColor: palette.border }]}
    >
      <Text style={[styles.title, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
        {title}
      </Text>
      <Text style={[styles.hint, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {hint}
      </Text>
      {actionLabel !== undefined && onAction !== undefined && (
        <Pressable
          accessibilityRole="button"
          onPress={onAction}
          style={[styles.button, { backgroundColor: palette.accent }]}
        >
          <Text style={[styles.buttonText, { color: palette.onAccent, fontSize: scaled(fontSize.md, textScale) }]}>
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.lg,
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  title: { fontWeight: '700' },
  hint: { lineHeight: 22 },
  button: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  buttonText: { fontWeight: '700' },
});
