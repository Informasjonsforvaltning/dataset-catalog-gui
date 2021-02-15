import {
  LIST_PLACES_REQUESTED,
  LIST_PLACES_SUCCEEDED,
  LIST_PLACES_FAILED,
  SEARCH_PLACES_REQUESTED,
  SEARCH_PLACES_SUCCEEDED,
  SEARCH_PLACES_FAILED
} from './actions-types';

import type { KartverketPlace } from '../../../types';

export function listPlacesRequested(ids: string[]) {
  return {
    type: LIST_PLACES_REQUESTED,
    payload: { ids }
  };
}

export function listPlacesSucceeded(places: KartverketPlace[]) {
  return {
    type: LIST_PLACES_SUCCEEDED,
    payload: {
      places
    }
  };
}

export function listPlacesFailed(errors: Error | Error[]) {
  return {
    type: LIST_PLACES_FAILED,
    payload: Array.isArray(errors) ? errors : [errors],
    error: true
  };
}

export function searchPlacesRequested(name: string, size: number) {
  return {
    type: SEARCH_PLACES_REQUESTED,
    payload: { name, size }
  };
}

export function searchPlacesSucceeded(places: KartverketPlace[]) {
  return {
    type: SEARCH_PLACES_SUCCEEDED,
    payload: {
      places
    }
  };
}

export function searchPlacesFailed(errors: Error | Error[]) {
  return {
    type: SEARCH_PLACES_FAILED,
    payload: Array.isArray(errors) ? errors : [errors],
    error: true
  };
}
