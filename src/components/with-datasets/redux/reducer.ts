import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  LIST_DATASETS_REQUESTED,
  LIST_DATASETS_SUCCEEDED,
  LIST_DATASETS_FAILED,
  SEARCH_DATASETS_REQUESTED,
  SEARCH_DATASETS_SUCCEEDED,
  SEARCH_DATASETS_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  datasets: [],
  datasetSuggestions: [],
  isLoadingDatasets: false,
  isLoadingDatasetSuggestions: false
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case LIST_DATASETS_REQUESTED:
      return state.set('datasets', fromJS([])).set('isLoadingDatasets', true);
    case LIST_DATASETS_SUCCEEDED:
      return state
        .set('datasets', fromJS(action.payload.datasets))
        .set('isLoadingDatasets', false);
    case LIST_DATASETS_FAILED:
      return state.set('isLoadingDatasets', false);
    case SEARCH_DATASETS_REQUESTED:
      return state
        .set('datasetSuggestions', fromJS([]))
        .set('isLoadingDatasetSuggestions', true);
    case SEARCH_DATASETS_SUCCEEDED:
      return state
        .set('datasetSuggestions', fromJS(action.payload.datasets))
        .set('isLoadingDatasetSuggestions', false);
    case SEARCH_DATASETS_FAILED:
      return state.set('isLoadingDatasetSuggestions', false);
    default:
      return state;
  }
}
