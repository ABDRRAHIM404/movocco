import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useI18n } from '../i18n/I18nContext';
import { DemoBadge } from './DemoBadge';

interface ScreenProps {
  title?: string;
  /** Show the DEMO badge in the header (any screen showing demo data). */
  demo?: boolean;
  /** Show a back button (stack screens). */
  back?: boolean;
  children: React.ReactNode;
}

/**
 * Standard screen shell: safe area, scrollable content, header with an
 * optional back button and DEMO badge. Minimum tap target 44pt is respected
 * by the button styles used across the app.
 */
export function Screen({ title, demo = false, back = false, children }: ScreenProps) {
  const { palette, textScale } = useAppTheme();
  const { t } = useI18n();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: palette.background, paddingTop: insets.top },
      ]}
    >
      {(title !== undefined || back) && (
        <View style={[styles.header, { borderBottomColor: palette.border }]}>
          {back ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('back')}
              onPress={() => router.back()}
              style={[styles.backButton, { borderColor: palette.border }]}
            >
              <Text style={[styles.backText, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
                {'‹ '}
                {t('back')}
              </Text>
            </Pressable>
          ) : (
            <View style={styles.backSpacer} />
          )}
          {title !== undefined && (
            <Text
              accessibilityRole="header"
              style={[styles.title, { color: palette.text, fontSize: scaled(fontSize.xl, textScale) }]}
            >
              {title}
            </Text>
          )}
          {demo ? <DemoBadge /> : <View style={styles.backSpacer} />}
        </View>
      )}
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  backButton: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderRadius: 8,
  },
  backText: { fontWeight: '600' },
  backSpacer: { width: 44 },
  title: { fontWeight: '700', flex: 1, textAlign: 'center' },
  content: { padding: spacing.lg, gap: spacing.lg },
});
