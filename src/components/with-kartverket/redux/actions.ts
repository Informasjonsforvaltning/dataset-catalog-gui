import {
  SEARCH_ADMINISTRATIVE_UNITS_REQUESTED,
  SEARCH_ADMINISTRATIVE_UNITS_SUCCEEDED,
  SEARCH_ADMINISTRATIVE_UNITS_FAILED,
  CLEAR_ADMINISTRATIVE_UNITS_SEARCH_SUGGESTIONS
} from './actions-types';

import type { AdministrativeUnit } from '../../../types';

export function searchAdministrativeUnitsRequested(name: string, size: number) {
  return {
    type: SEARCH_ADMINISTRATIVE_UNITS_REQUESTED,
    payload: { name, size }
  };
}

export function searchAdministrativeUnitsSucceeded(
  administrativeUnits: AdministrativeUnit[]
) {
  return {
    type: SEARCH_ADMINISTRATIVE_UNITS_SUCCEEDED,
    payload: {
      administrativeUnits
    }
  };
}

export function searchAdministrativeUnitsFailed(errors: Error | Error[]) {
  return {
    type: SEARCH_ADMINISTRATIVE_UNITS_FAILED,
    payload: Array.isArray(errors) ? errors : [errors],
    error: true
  };
}

export function clearAdministrativeUnitsSearchSuggestions() {
  return {
    type: CLEAR_ADMINISTRATIVE_UNITS_SEARCH_SUGGESTIONS
  };
}
