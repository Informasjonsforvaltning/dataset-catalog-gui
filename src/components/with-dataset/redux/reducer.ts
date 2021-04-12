import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASET_REQUESTED,
  GET_DATASET_SUCCEEDED,
  GET_DATASET_FAILED,
  CREATE_DATASET_REQUESTED,
  CREATE_DATASET_SUCCEEDED,
  CREATE_DATASET_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  dataset: undefined,
  createdDataset: undefined,
  isLoadingDataset: false,
  isCreatingDataset: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATASET_REQUESTED:
      return state
        .set('dataset', undefined)
        .set('createdDataset', undefined)
        .set('isLoadingDataset', true);
    case GET_DATASET_SUCCEEDED:
      return state
        .set('dataset', fromJS(action.payload.dataset))
        .set('isLoadingDataset', false);
    case GET_DATASET_FAILED:
      return state.set('isLoadingDataset', false);
    case CREATE_DATASET_REQUESTED:
      return state
        .set('createdDataset', undefined)
        .set('isCreatingDataset', true);
    case CREATE_DATASET_SUCCEEDED:
      return state
        .set('createdDataset', fromJS(action.payload.dataset))
        .set('isCreatingDataset', false);
    case CREATE_DATASET_FAILED:
      return state.set('isCreatingDataset', false);
    default:
      return state;
  }
}