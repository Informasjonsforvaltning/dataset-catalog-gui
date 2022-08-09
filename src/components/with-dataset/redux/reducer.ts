import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASET_REQUESTED,
  GET_DATASET_SUCCEEDED,
  GET_DATASET_FAILED,
  PATCH_DATASET_SUCCEEDED,
  CREATE_DATASET_REQUESTED,
  CREATE_DATASET_SUCCEEDED,
  CREATE_DATASET_FAILED,
  DELETE_DATASET_REQUESTED,
  DELETE_DATASET_SUCCEEDED,
  DELETE_DATASET_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  dataset: undefined,
  createdDataset: undefined,
  isLoadingDataset: false,
  isCreatingDataset: false,
  isDeletingDataset: false
});

export default function reducer(
  state: any = initialState,
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
    case PATCH_DATASET_SUCCEEDED:
      return state.set('dataset', fromJS(action.payload.dataset));
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
    case DELETE_DATASET_REQUESTED:
      return state.set('isDeletingDataset', true);
    case DELETE_DATASET_SUCCEEDED:
      return state
        .set('dataset', undefined)
        .set('createdDataset', undefined)
        .set('isDeletingDataset', false);
    case DELETE_DATASET_FAILED:
      return state.set('isDeletingDataset', false);
    default:
      return state;
  }
}
