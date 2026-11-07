import { StyleSheet, Text, View } from 'react-native';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useI18n } from '../i18n/I18nContext';

/**
 * Visible DEMO badge. Every screen that shows the labelled demo dataset must
 * render this, so demo content is never mistaken for verified information.
 */
export function DemoBadge() {
  const { palette, textScale } = useAppTheme();
  const { t } = useI18n();
  return (
    <View
      accessibilityLabel={t('demoNotice')}
      style={[styles.badge, { backgroundColor: palette.demoBackground, borderColor: palette.demo }]}
    >
      <Text style={[styles.text, { color: palette.demo, fontSize: scaled(fontSize.xs, textScale) }]}>
        {t('demo')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  text: { fontWeight: '800', letterSpacing: 1 },
});
