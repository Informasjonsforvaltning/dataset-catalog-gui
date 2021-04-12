import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASET_CATALOG_REQUESTED,
  GET_DATASET_CATALOG_SUCCEEDED,
  GET_DATASET_CATALOG_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  datasetCatalog: undefined,
  isLoadingDatasetCatalog: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATASET_CATALOG_REQUESTED:
      return state
        .set('datasetCatalog', undefined)
        .set('isLoadingDatasetCatalog', true);
    case GET_DATASET_CATALOG_SUCCEEDED:
      return state
        .set('datasetCatalog', fromJS(action.payload.catalog))
        .set('isLoadingDatasetCatalog', false);
    case GET_DATASET_CATALOG_FAILED:
      return state.set('isLoadingDatasetCatalog', false);
    default:
      return state;
  }
}
