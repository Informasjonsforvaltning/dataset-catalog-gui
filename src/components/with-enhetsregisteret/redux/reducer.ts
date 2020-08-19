import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  LIST_ORGANIZATIONS_REQUESTED,
  LIST_ORGANIZATIONS_SUCCEEDED,
  LIST_ORGANIZATIONS_FAILED,
  SEARCH_ORGANIZATIONS_REQUESTED,
  SEARCH_ORGANIZATIONS_SUCCEEDED,
  SEARCH_ORGANIZATIONS_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  organizations: [],
  organizationSuggestions: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case LIST_ORGANIZATIONS_REQUESTED:
      return state;
    case LIST_ORGANIZATIONS_SUCCEEDED:
      return state.set('organizations', fromJS(action.payload.organizations));
    case LIST_ORGANIZATIONS_FAILED:
      return state;
    case SEARCH_ORGANIZATIONS_REQUESTED:
      return state;
    case SEARCH_ORGANIZATIONS_SUCCEEDED:
      return state.set(
        'organizationSuggestions',
        fromJS(action.payload.organizations)
      );
    case SEARCH_ORGANIZATIONS_FAILED:
      return state;
    default:
      return state;
  }
}
