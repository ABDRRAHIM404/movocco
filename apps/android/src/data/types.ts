/**
 * Shared domain types for the Movocco Android pilot.
 *
 * These mirror the entity contracts in the product spec (§17) in a reduced
 * Level A form. Unknown is a valid value: fares, durations and schedules are
 * optional, and the UI must render "unknown" instead of inventing a value.
 */

export type TransportMode =
  | 'grand-taxi'
  | 'petit-taxi'
  | 'city-bus'
  | 'intercity-bus'
  | 'ride-hailing'
  | 'rural-shared'
  | 'airport-transfer'
  | 'train'
  | 'walking';

export const TRANSPORT_MODES: TransportMode[] = [
  'grand-taxi',
  'petit-taxi',
  'city-bus',
  'intercity-bus',
  'ride-hailing',
  'rural-shared',
  'airport-transfer',
  'train',
];

export const TRANSPORT_MODE_LABELS: Record<TransportMode, { en: string; fr: string }> = {
  'grand-taxi': { en: 'Grand taxi', fr: 'Grand taxi' },
  'petit-taxi': { en: 'Petit taxi', fr: 'Petit taxi' },
  'city-bus': { en: 'City bus', fr: 'Bus urbain' },
  'intercity-bus': { en: 'Intercity bus', fr: 'Bus interurbain' },
  'ride-hailing': { en: 'Ride-hailing', fr: 'VTC' },
  'rural-shared': { en: 'Rural / shared transport', fr: 'Transport rural / partagé' },
  'airport-transfer': { en: 'Airport transfer', fr: 'Navette aéroport' },
  train: { en: 'Train', fr: 'Train' },
  /** Walking is a leg type (walking_connections), not one of the 8 transport categories. */
  walking: { en: 'On foot', fr: 'À pied' },
};

/** How much a fact can be trusted. `demo` is only for the labelled pilot data. */
export type EvidenceLevel =
  | 'official'
  | 'admin-verified'
  | 'community-confirmed'
  | 'unconfirmed'
  | 'demo';

/** How a value was measured. */
export type MeasurementLevel = 'published' | 'observed' | 'estimated' | 'unknown';

export interface SourceInfo {
  /** Human-readable source label, e.g. "Movocco demo dataset". */
  label: string;
  /** Direct URL when one exists; null when there is none. */
  url: string | null;
  evidence: EvidenceLevel;
  measurement: MeasurementLevel;
  /** ISO date the fact was last reviewed, or null when unknown. */
  lastReviewedOn: string | null;
}

export type PlaceKind = 'landmark' | 'hub' | 'beach' | 'market' | 'neighbourhood' | 'station';

export interface Place {
  id: string;
  names: { en: string; fr: string };
  aliases: string[];
  kind: PlaceKind;
  /** Approximate coordinates (WGS84). Demo places use approximate positions. */
  lat: number;
  lon: number;
  /** Short description shown on the place screen (no transport claims). */
  description: { en: string; fr: string };
}

export interface Leg {
  mode: TransportMode;
  fromPlaceId: string;
  toPlaceId: string;
  /** Exact boarding instruction when verified; demo text is labelled demo. */
  boardingPoint: string;
  direction: string;
  fareMinMad: number | null;
  fareMaxMad: number | null;
  fareBasis: 'per-person' | 'per-vehicle' | null;
  durationMin: number | null;
  durationMax: number | null;
  /** True when this leg is walking (feasibility must be verified in real data). */
  walking: boolean;
  note: string | null;
}

export interface Journey {
  id: string;
  originId: string;
  destinationId: string;
  legs: Leg[];
  fareMinMad: number | null;
  fareMaxMad: number | null;
  durationMin: number | null;
  durationMax: number | null;
  source: SourceInfo;
}

export interface SavedJourney {
  journeyId: string;
  originName: string;
  destinationName: string;
  /** Plain-text snapshot of the steps, readable offline. */
  snapshotText: string;
  /** ISO date string when the snapshot was saved. */
  savedOn: string;
  fareText: string;
  durationText: string;
}

export interface AppSettings {
  largeText: boolean;
  lowData: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = { largeText: false, lowData: false };
