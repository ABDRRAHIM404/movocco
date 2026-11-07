/**
 * In-memory origin/destination selection for the Plan tab.
 *
 * The place-search screen writes the chosen place here and pops back; the
 * Plan screen re-reads the store when it regains focus. Nothing here is
 * persisted: it is a transient search draft, not saved data.
 */
import type { Place } from '../data/types';

let origin: Place | null = null;
let destination: Place | null = null;

export function getSelection(): { origin: Place | null; destination: Place | null } {
  return { origin, destination };
}

export function setOrigin(place: Place | null): void {
  origin = place;
}

export function setDestination(place: Place | null): void {
  destination = place;
}

export function swapSelection(): void {
  const previous = origin;
  origin = destination;
  destination = previous;
}

export function clearSelection(): void {
  origin = null;
  destination = null;
}
