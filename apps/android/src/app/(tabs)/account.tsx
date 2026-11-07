import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '../../components/Screen';
import { EmptyState } from '../../components/EmptyState';
import { fontSize, scaled, spacing } from '../../theme';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useI18n } from '../../i18n/I18nContext';
import { supabaseStatus } from '../../lib/supabase';

/**
 * Account tab (Level A): guest browsing only.
 * Sign-in, account sync and account deletion need a backend, which does not
 * exist yet — the screen says so instead of pretending otherwise.
 */
export default function AccountScreen() {
  const { palette, textScale } = useAppTheme();
  const { t } = useI18n();
  const router = useRouter();
  const [showSignInNotice, setShowSignInNotice] = useState(false);
  const [showDeleteNotice, setShowDeleteNotice] = useState(false);

  return (
    <Screen title={t('accountTitle')}>
      <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <Text style={[styles.guest, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
          {t('guest')}
        </Text>
        <Text style={[styles.hint, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('guestHint')}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => setShowSignInNotice(true)}
        style={[styles.primary, { backgroundColor: palette.accent }]}
      >
        <Text style={[styles.primaryText, { color: palette.onAccent, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('signIn')}
        </Text>
      </Pressable>

      {showSignInNotice && (
        <EmptyState title={t('signInUnavailable')} hint={t('signInUnavailableHint')} />
      )}

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/settings')}
        style={[styles.row, { backgroundColor: palette.surface, borderColor: palette.border }]}
      >
        <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('settings')}
        </Text>
      </Pressable>

      <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <Text style={[styles.rowTitle, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('supabaseStatus')}
        </Text>
        <Text style={[styles.hint, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
          {supabaseStatus === 'ready' ? t('supabaseReady') : t('supabaseNotConfigured')}
        </Text>
        <Text style={[styles.hint, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
          {t('privacyNote')}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => setShowDeleteNotice(true)}
        style={styles.delete}
      >
        <Text style={[styles.deleteText, { color: palette.danger, fontSize: scaled(fontSize.md, textScale) }]}>
          {t('deleteAccount')}
        </Text>
      </Pressable>
      {showDeleteNotice && (
        <EmptyState title={t('deleteAccount')} hint={t('deleteAccountHint')} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 12, padding: spacing.lg, gap: spacing.sm },
  guest: { fontWeight: '800' },
  hint: { lineHeight: 22 },
  primary: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { fontWeight: '800' },
  row: {
    minHeight: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  rowTitle: { fontWeight: '700' },
  delete: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  deleteText: { fontWeight: '700' },
});
