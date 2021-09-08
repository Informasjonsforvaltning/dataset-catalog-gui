import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  LIST_CATALOGS_REQUESTED,
  LIST_CATALOGS_SUCCEEDED,
  LIST_CATALOGS_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  catalogs: [],
  isLoadingCatalogs: false
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case LIST_CATALOGS_REQUESTED:
      return state.set('catalogs', fromJS([])).set('isLoadingCatalogs', true);
    case LIST_CATALOGS_SUCCEEDED:
      return state
        .set('catalogs', fromJS(action.payload.catalogs))
        .set('isLoadingCatalogs', false);
    case LIST_CATALOGS_FAILED:
      return state.set('isLoadingCatalogs', false);
    default:
      return state;
  }
}
