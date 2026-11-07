import { StyleSheet, Text, View } from 'react-native';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useI18n } from '../i18n/I18nContext';
import type { SourceInfo } from '../data/types';

/**
 * Provenance badge: who the information comes from, how it was measured,
 * and when it was last reviewed. Unknown is shown as unknown, never faked.
 */
export function SourceBadge({ source }: { source: SourceInfo }) {
  const { palette, textScale } = useAppTheme();
  const { t } = useI18n();

  const evidenceLabel =
    source.evidence === 'demo'
      ? t('evidenceDemo')
      : source.evidence === 'unconfirmed'
        ? t('evidenceUnconfirmed')
        : source.evidence;

  return (
    <View
      style={[styles.box, { backgroundColor: palette.surface, borderColor: palette.border }]}
    >
      <Text style={[styles.line, { color: palette.text, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('source')}: {source.label} · {evidenceLabel}
      </Text>
      <Text style={[styles.line, { color: palette.muted, fontSize: scaled(fontSize.sm, textScale) }]}>
        {t('lastUpdated')}: {source.lastReviewedOn ?? '—'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  line: { lineHeight: 20 },
});
