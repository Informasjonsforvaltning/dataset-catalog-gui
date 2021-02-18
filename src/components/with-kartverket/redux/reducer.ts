import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  SEARCH_ADMINISTRATIVE_UNITS_REQUESTED,
  SEARCH_ADMINISTRATIVE_UNITS_SUCCEEDED,
  SEARCH_ADMINISTRATIVE_UNITS_FAILED,
  CLEAR_ADMINISTRATIVE_UNITS_SEARCH_SUGGESTIONS
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  administrativeUnitSuggestions: [],
  isLoadingAdministrativeUnitSuggestions: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case SEARCH_ADMINISTRATIVE_UNITS_REQUESTED:
      return state.set('isLoadingAdministrativeUnitSuggestions', true);
    case SEARCH_ADMINISTRATIVE_UNITS_SUCCEEDED:
      return state
        .set(
          'administrativeUnitSuggestions',
          fromJS(action.payload.administrativeUnits)
        )
        .set('isLoadingAdministrativeUnitSuggestions', false);
    case SEARCH_ADMINISTRATIVE_UNITS_FAILED:
      return state.set('isLoadingAdministrativeUnitSuggestions', false);
    case CLEAR_ADMINISTRATIVE_UNITS_SEARCH_SUGGESTIONS:
      return state.set('administrativeUnitSuggestions', fromJS([]));
    default:
      return state;
  }
}
