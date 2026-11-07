/**
 * DEMO / MOCK dataset for the Movocco Android pilot (Level A).
 *
 * READ THIS BEFORE USING THE DATA:
 * - There is NO verified Agadir transport dataset yet. Nothing here is real
 *   transport information.
 * - Place names are well-known Agadir landmarks, used only so the screens
 *   can be demonstrated. Coordinates are APPROXIMATE.
 * - Every journey, fare, duration and boarding instruction in this file is
 *   INVENTED FOR DEMONSTRATION ONLY. It must never be presented as verified,
 *   and every screen that shows it carries a visible DEMO badge.
 * - Real data will replace this file through the Supabase backend (see
 *   `supabase/migrations/`) once it is independently verified and approved.
 * - Pairs with no demo journey intentionally render the honest empty state
 *   ("No verified data yet"), which is the correct behaviour for real data
 *   too.
 */

import type { Journey, Place, SourceInfo } from './types';

const DEMO_SOURCE: SourceInfo = {
  label: 'Movocco demo dataset',
  url: null,
  evidence: 'demo',
  measurement: 'estimated',
  lastReviewedOn: null,
};

export const DEMO_PLACES: Place[] = [
  {
    id: 'corniche',
    names: { en: 'Agadir Corniche', fr: 'Corniche d’Agadir' },
    aliases: ['corniche', 'plage', 'beach', 'la corniche', 'الكورنيش'],
    kind: 'beach',
    lat: 30.42,
    lon: -9.61,
    description: {
      en: 'Seafront promenade and beach area in Agadir.',
      fr: 'Promenade en front de mer et plage d’Agadir.',
    },
  },
  {
    id: 'souk-el-had',
    names: { en: 'Souk El Had', fr: 'Souk El Had' },
    aliases: ['souk', 'souk el had', 'souk elhad', 'market', 'marché', 'السوق الأحد'],
    kind: 'market',
    lat: 30.413,
    lon: -9.58,
    description: {
      en: 'Large covered market in Agadir.',
      fr: 'Grand marché couvert d’Agadir.',
    },
  },
  {
    id: 'marina',
    names: { en: 'Marina of Agadir', fr: 'Marina d’Agadir' },
    aliases: ['marina', 'port', 'le port de plaisance'],
    kind: 'landmark',
    lat: 30.425,
    lon: -9.615,
    description: {
      en: 'Marina and harbour area at the northern end of the bay.',
      fr: 'Marina et zone portuaire au nord de la baie.',
    },
  },
  {
    id: 'oufella',
    names: { en: 'Agadir Oufella (Kasbah)', fr: 'Agadir Oufella (Kasbah)' },
    aliases: ['oufella', 'kasbah', 'casbah', 'la kasbah', 'أكادير أوفلا'],
    kind: 'landmark',
    lat: 30.429,
    lon: -9.622,
    description: {
      en: 'Hilltop kasbah overlooking the bay of Agadir.',
      fr: 'Kasbah sur la colline qui domine la baie d’Agadir.',
    },
  },
  {
    id: 'hay-essalam',
    names: { en: 'Hay Essalam', fr: 'Hay Essalam' },
    aliases: ['hay essalam', 'essalam', 'hay salam'],
    kind: 'neighbourhood',
    lat: 30.405,
    lon: -9.56,
    description: {
      en: 'Residential neighbourhood in Agadir.',
      fr: 'Quartier résidentiel d’Agadir.',
    },
  },
  {
    id: 'founty',
    names: { en: 'Cité Founty', fr: 'Cité Founty' },
    aliases: ['founty', 'cité founty', 'founti'],
    kind: 'neighbourhood',
    lat: 30.4,
    lon: -9.59,
    description: {
      en: 'Residential and hotel area south of the city centre.',
      fr: 'Quartier résidentiel et hôtelier au sud du centre-ville.',
    },
  },
  {
    id: 'gare-routiere',
    names: { en: 'Agadir Bus Station', fr: 'Gare routière d’Agadir' },
    aliases: ['gare routière', 'gare routiere', 'bus station', 'station de bus'],
    kind: 'station',
    lat: 30.407,
    lon: -9.575,
    description: {
      en: 'Intercity bus station in Agadir. Services and fares are not verified yet.',
      fr: 'Gare routière interurbaine d’Agadir. Les services et tarifs ne sont pas encore vérifiés.',
    },
  },
  {
    id: 'grand-taxi-station',
    names: { en: 'Grand Taxi Station', fr: 'Station de grands taxis' },
    aliases: ['grand taxi', 'grands taxis', 'taxi station', 'station taxi'],
    kind: 'hub',
    lat: 30.41,
    lon: -9.585,
    description: {
      en: 'Grand taxi departure area. Destinations, fares and departure rules are not verified yet.',
      fr: 'Zone de départ des grands taxis. Les destinations, tarifs et règles de départ ne sont pas encore vérifiés.',
    },
  },
];

/**
 * Demo journeys. Fares and durations are invented ranges for demonstration
 * only. One journey deliberately has unknown fare/duration to exercise the
 * honest "unknown" state, and one is on foot only.
 */
export const DEMO_JOURNEYS: Journey[] = [
  {
    id: 'demo-j1',
    originId: 'corniche',
    destinationId: 'souk-el-had',
    legs: [
      {
        mode: 'petit-taxi',
        fromPlaceId: 'corniche',
        toPlaceId: 'souk-el-had',
        boardingPoint: 'DEMO — outside the Corniche promenade (illustrative only)',
        direction: 'DEMO — towards Souk El Had (illustrative only)',
        fareMinMad: 7,
        fareMaxMad: 10,
        fareBasis: 'per-vehicle',
        durationMin: 8,
        durationMax: 12,
        walking: false,
        note: null,
      },
    ],
    fareMinMad: 7,
    fareMaxMad: 10,
    durationMin: 8,
    durationMax: 12,
    source: DEMO_SOURCE,
  },
  {
    id: 'demo-j2',
    originId: 'marina',
    destinationId: 'oufella',
    legs: [
      {
        mode: 'petit-taxi',
        fromPlaceId: 'marina',
        toPlaceId: 'oufella',
        boardingPoint: 'DEMO — near the marina entrance (illustrative only)',
        direction: 'DEMO — towards the kasbah hill (illustrative only)',
        fareMinMad: null,
        fareMaxMad: null,
        fareBasis: null,
        durationMin: null,
        durationMax: null,
        walking: false,
        note: 'Fare and duration are unknown in this demo.',
      },
    ],
    fareMinMad: null,
    fareMaxMad: null,
    durationMin: null,
    durationMax: null,
    source: DEMO_SOURCE,
  },
  {
    id: 'demo-j3',
    originId: 'hay-essalam',
    destinationId: 'gare-routiere',
    legs: [
      {
        mode: 'city-bus',
        fromPlaceId: 'hay-essalam',
        toPlaceId: 'gare-routiere',
        boardingPoint: 'DEMO — nearest signed bus stop (illustrative only)',
        direction: 'DEMO — towards the bus station (illustrative only)',
        fareMinMad: 4,
        fareMaxMad: 6,
        fareBasis: 'per-person',
        durationMin: 15,
        durationMax: 25,
        walking: false,
        note: null,
      },
    ],
    fareMinMad: 4,
    fareMaxMad: 6,
    durationMin: 15,
    durationMax: 25,
    source: DEMO_SOURCE,
  },
  {
    id: 'demo-j4',
    originId: 'corniche',
    destinationId: 'marina',
    legs: [
      {
        mode: 'walking',
        fromPlaceId: 'corniche',
        toPlaceId: 'marina',
        boardingPoint: 'DEMO — on foot along the seafront (illustrative only)',
        direction: 'DEMO — north along the bay (illustrative only)',
        fareMinMad: 0,
        fareMaxMad: 0,
        fareBasis: null,
        durationMin: 20,
        durationMax: 30,
        walking: true,
        note: 'Walking route feasibility is not verified.',
      },
    ],
    fareMinMad: 0,
    fareMaxMad: 0,
    durationMin: 20,
    durationMax: 30,
    source: DEMO_SOURCE,
  },
];

export function getPlace(id: string): Place | undefined {
  return DEMO_PLACES.find((p) => p.id === id);
}

export function getJourney(id: string): Journey | undefined {
  return DEMO_JOURNEYS.find((j) => j.id === id);
}

export function findJourneys(originId: string, destinationId: string): Journey[] {
  if (originId === destinationId) return [];
  return DEMO_JOURNEYS.filter(
    (j) => j.originId === originId && j.destinationId === destinationId,
  );
}

/** Simple substring/prefix search over names and aliases (EN + FR + Arabic). */
export function searchPlaces(query: string): Place[] {
  const q = query.trim().toLowerCase();
  // Blank query returns nothing: the search screen shows its hint state
  // instead of the whole dataset.
  if (q.length === 0) return [];
  return DEMO_PLACES.filter((place) => {
    const haystacks = [
      place.names.en,
      place.names.fr,
      ...place.aliases,
    ].map((s) => s.toLowerCase());
    return haystacks.some((h) => h.includes(q));
  });
}
