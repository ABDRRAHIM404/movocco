import { Pressable, StyleSheet, Text, View } from 'react-native';
import { fontSize, scaled, spacing } from '../theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { useI18n } from '../i18n/I18nContext';
import { TRANSPORT_MODE_LABELS, type Journey } from '../data/types';
import { durationText, fareText } from '../lib/journey';
import { DemoBadge } from './DemoBadge';

interface JourneyCardProps {
  journey: Journey;
  originName: string;
  destinationName: string;
  badges: { cheapest?: boolean; fastest?: boolean; fewest?: boolean };
  onPress: () => void;
}

/** One journey option. Unknown fares/durations are shown as unknown. */
export function JourneyCard({ journey, originName, destinationName, badges, onPress }: JourneyCardProps) {
  const { palette, textScale } = useAppTheme();
  const { t, locale } = useI18n();

  const fare = fareText(journey);
  const duration = durationText(journey);
  const transfers = Math.max(0, journey.legs.length - 1);
  const modes = journey.legs
    .map((leg) => TRANSPORT_MODE_LABELS[leg.mode][locale])
    .filter((value, index, arr) => arr.indexOf(value) === index)
    .join(' · ');
  // Mode icon tile: first letter of the first leg's mode, cyan per the design.
  const firstMode = journey.legs[0]?.mode;
  const modeLetter =
    firstMode !== undefined
      ? TRANSPORT_MODE_LABELS[firstMode][locale].charAt(0).toUpperCase()
      : '?';

  const rankBadges: string[] = [];
  if (badges.cheapest === true) rankBadges.push(t('cheapest'));
  if (badges.fastest === true) rankBadges.push(t('fastest'));
  if (badges.fewest === true) rankBadges.push(t('fewestTransfers'));

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}
    >
      <View style={styles.topRow}>
        <View style={[styles.modeTile, { backgroundColor: palette.info }]}>
          <Text style={[styles.modeTileText, { color: palette.background, fontSize: scaled(fontSize.lg, textScale) }]}>
            {modeLetter}
          </Text>
        </View>
        <Text style={[styles.route, { color: palette.text, fontSize: scaled(fontSize.lg, textScale) }]}>
          {originName} → {destinationName}
        </Text>
        <DemoBadge />
      </View>
      <Text style={[styles.meta, { color: palette.muted, fontSize: scaled(fontSize.md, textScale) }]}>
        {modes} · {journey.legs.length} {t('legs')} ·{' '}
        {transfers === 0 ? t('noTransfers') : `${transfers} ${t('transfers')}`}
      </Text>
      <Text style={[styles.meta, { color: palette.text, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('fareRange')}: {fare ?? t('fareUnknown')}
        {'   '}
        {t('durationRange')}: {duration ?? t('durationUnknown')}
      </Text>
      {rankBadges.length > 0 && (
        <View style={styles.badgeRow}>
          {rankBadges.map((label) => (
            <View
              key={label}
              style={[styles.rankBadge, { backgroundColor: palette.accentSoft, borderColor: palette.accent }]}
            >
              <Text style={[styles.rankText, { color: palette.accentText, fontSize: scaled(fontSize.xs, textScale) }]}>
                {label}
              </Text>
            </View>
          ))}
        </View>
      )}
      <Text style={[styles.link, { color: palette.accentText, fontSize: scaled(fontSize.md, textScale) }]}>
        {t('viewDetails')} ›
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  modeTile: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeTileText: { fontWeight: '800' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.sm },
  route: { fontWeight: '700', flex: 1 },
  meta: { lineHeight: 22 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  rankBadge: { borderWidth: 1, borderRadius: 999, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  rankText: { fontWeight: '700' },
  link: { fontWeight: '700' },
});
