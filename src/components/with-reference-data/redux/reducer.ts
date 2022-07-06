import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_REFERENCE_DATA_REQUESTED,
  GET_REFERENCE_DATA_SUCCEEDED,
  GET_REFERENCE_DATA_FAILED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  referenceData: {}
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_REFERENCE_DATA_REQUESTED:
      return state.set(
        'referenceData',
        state.get('referenceData').deleteAll(action.payload.codes)
      );
    case GET_REFERENCE_DATA_SUCCEEDED: {
      return state.set(
        'referenceData',
        state.get('referenceData').merge(fromJS(action.payload.data))
      );
    }
    case GET_REFERENCE_DATA_FAILED:
      return state;
    default:
      return state;
  }
}
