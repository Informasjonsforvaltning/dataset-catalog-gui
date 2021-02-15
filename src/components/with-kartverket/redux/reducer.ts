import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  LIST_PLACES_REQUESTED,
  LIST_PLACES_SUCCEEDED,
  LIST_PLACES_FAILED,
  SEARCH_PLACES_REQUESTED,
  SEARCH_PLACES_SUCCEEDED,
  SEARCH_PLACES_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  places: [],
  placeSuggestions: [],
  isLoadingPlaces: false,
  isLoadingPlaceSuggestions: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case LIST_PLACES_REQUESTED:
      return state.set('isLoadingPlaces', true);
    case LIST_PLACES_SUCCEEDED:
      return state
        .set('places', fromJS(action.payload.places))
        .set('isLoadingPlaces', false);
    case LIST_PLACES_FAILED:
      return state.set('isLoadingPlaces', false);
    case SEARCH_PLACES_REQUESTED:
      return state.set('isLoadingPlaceSuggestions', true);
    case SEARCH_PLACES_SUCCEEDED:
      return state
        .set('placeSuggestions', fromJS(action.payload.places))
        .set('isLoadingPlaceSuggestions', false);
    case SEARCH_PLACES_FAILED:
      return state.set('isLoadingPlaceSuggestions', false);
    default:
      return state;
  }
}
