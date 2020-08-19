import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  LIST_ORGANIZATIONS_REQUESTED,
  SEARCH_ORGANIZATIONS_REQUESTED
} from './actions-types';
import * as actions from './actions';

import { searchOrganizations } from './operations';

import type { EnhetsregisteretOrganization } from '../../../types';

function* listOrganizationsRequested({
  payload: { ids }
}: ReturnType<typeof actions.listOrganizationsRequested>) {
  try {
    const { data } = yield call(searchOrganizations, {
      organisasjonsnummer: ids.join()
    });

    if (data?._embedded?.enheter?.length > 0) {
      yield put(
        actions.listOrganizationsSucceeded(
          data?._embedded?.enheter as EnhetsregisteretOrganization[]
        )
      );
    } else {
      yield put(
        actions.listOrganizationsFailed(
          new Error(
            'An error occurred during an attempt to contact Enhetsregisteret API'
          )
        )
      );
    }
  } catch (error) {
    yield put(actions.listOrganizationsFailed(error));
  }
}

function* searchOrganizationsRequested({
  payload: { query = '', size }
}: ReturnType<typeof actions.searchOrganizationsRequested>) {
  try {
    const isOrganisationNumber = /^\d{9}$/.test(query);

    const { data } = yield call(searchOrganizations, {
      [isOrganisationNumber ? 'organisasjonsnummer' : 'navn']: query,
      size
    });

    if (data?._embedded?.enheter?.length > 0) {
      yield put(
        actions.searchOrganizationsSucceeded(
          data?._embedded?.enheter as EnhetsregisteretOrganization[]
        )
      );
    } else {
      yield put(
        actions.searchOrganizationsFailed(
          new Error(
            'An error occurred during an attempt to contact Enhetsregisteret API'
          )
        )
      );
    }
  } catch (error) {
    yield put(actions.searchOrganizationsFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(LIST_ORGANIZATIONS_REQUESTED, listOrganizationsRequested),
    takeLatest(SEARCH_ORGANIZATIONS_REQUESTED, searchOrganizationsRequested)
  ]);
}
