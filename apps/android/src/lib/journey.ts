/**
 * Journey ranking helpers.
 *
 * The product spec is explicit: label a journey cheapest / fastest / fewest
 * transfers ONLY when the evidence supports the comparison. When any fare or
 * duration in the comparison set is unknown, ranking is refused and the UI
 * must say so instead of guessing.
 */
import type { Journey } from '../data/types';

export interface Ranking {
  cheapestId: string | null;
  fastestId: string | null;
  fewestTransfersId: string | null;
  /** True when at least one comparison could not be made honestly. */
  incomplete: boolean;
  incompleteReason: string | null;
}

function transferCount(journey: Journey): number {
  return Math.max(0, journey.legs.length - 1);
}

export function rankJourneys(journeys: Journey[]): Ranking {
  if (journeys.length === 0) {
    return {
      cheapestId: null,
      fastestId: null,
      fewestTransfersId: null,
      incomplete: false,
      incompleteReason: null,
    };
  }

  const faresKnown = journeys.every(
    (j) => j.fareMinMad !== null && j.fareMaxMad !== null,
  );
  const durationsKnown = journeys.every(
    (j) => j.durationMin !== null && j.durationMax !== null,
  );

  let cheapestId: string | null = null;
  let fastestId: string | null = null;
  let fewestTransfersId: string | null = null;
  const reasons: string[] = [];

  // A badge is awarded only when the winner is strictly better than at
  // least one other journey. A tie across the whole set (e.g. every option
  // is a single leg, or every fare is 0 MAD) earns no badge — marking the
  // first item would be arbitrary, not a real ranking.
  if (faresKnown) {
    const minFare = Math.min(...journeys.map((j) => j.fareMaxMad as number));
    if (journeys.some((j) => (j.fareMaxMad as number) > minFare)) {
      cheapestId = journeys.find((j) => (j.fareMaxMad as number) === minFare)!.id;
    }
  } else {
    reasons.push('fares incomplete');
  }

  if (durationsKnown) {
    const minDuration = Math.min(...journeys.map((j) => j.durationMax as number));
    if (journeys.some((j) => (j.durationMax as number) > minDuration)) {
      fastestId = journeys.find((j) => (j.durationMax as number) === minDuration)!.id;
    }
  } else {
    reasons.push('durations incomplete');
  }

  // Transfer count is always known: it comes from the leg list itself.
  const minTransfers = Math.min(...journeys.map(transferCount));
  if (journeys.some((j) => transferCount(j) > minTransfers)) {
    fewestTransfersId = journeys.find((j) => transferCount(j) === minTransfers)!.id;
  }

  return {
    cheapestId,
    fastestId,
    fewestTransfersId,
    incomplete: reasons.length > 0,
    incompleteReason:
      reasons.length > 0 ? `Ranking incomplete: ${reasons.join(', ')}.` : null,
  };
}

/** "7–10 MAD" / "Free (on foot)" / null when unknown. */
export function fareText(journey: Journey): string | null {
  const { fareMinMad, fareMaxMad } = journey;
  if (fareMinMad === null || fareMaxMad === null) return null;
  if (fareMinMad === 0 && fareMaxMad === 0) return '0 MAD';
  if (fareMinMad === fareMaxMad) return `${fareMinMad} MAD`;
  return `${fareMinMad}–${fareMaxMad} MAD`;
}

/** "8–12 min" / null when unknown. */
export function durationText(journey: Journey): string | null {
  const { durationMin, durationMax } = journey;
  if (durationMin === null || durationMax === null) return null;
  if (durationMin === durationMax) return `${durationMin} min`;
  return `${durationMin}–${durationMax} min`;
}
