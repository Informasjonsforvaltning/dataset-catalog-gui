import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import AuthService from '../../../services/auth';

import {
  LIST_DATASETS_REQUESTED,
  SEARCH_DATASETS_REQUESTED
} from './actions-types';
import * as actions from './actions';

import { searchDatasetRegistration, searchFullTextApi } from './operations';

import type { Dataset } from '../../../types';
import { RegistrationStatus } from '../../../types/enums';

const { FDK_REGISTRATION_BASE_URI } = env;

function* listDatasetsRequested({
  payload: { catalogId, size }
}: ReturnType<typeof actions.listDatasetsRequested>) {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { data } = yield call(
      axios.get,
      `${FDK_REGISTRATION_BASE_URI}/catalogs/${catalogId}/datasets`,
      {
        params: { size },
        headers: {
          authorization,
          accept: 'application/json',
          'cache-control': 'no-cache'
        }
      }
    );

    if (Array.isArray(data?._embedded.datasets)) {
      yield put(
        actions.listDatasetsSucceeded(data._embedded.datasets as Dataset[])
      );
    } else {
      yield put(
        actions.listDatasetsFailed(
          'An error occurred during an attempt to list datasets.'
        )
      );
    }
  } catch (error) {
    yield put(actions.listDatasetsFailed(error));
  }
}

function* searchDatasetsRequested({
  payload: { query, searchType, catalogIDs }
}: ReturnType<typeof actions.searchDatasetsRequested>) {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { data } = yield call(
      axios.post,
      `${FDK_REGISTRATION_BASE_URI}/search`,
      { query, searchType, catalogIDs },
      { headers: { authorization } }
    );

    if (Array.isArray(data?.datasets)) {
      yield put(actions.searchDatasetsSucceeded(data.datasets as Dataset[]));
    } else {
      yield put(
        actions.searchDatasetsFailed(
          'An error occurred during an attempt to search the dataset catalog.'
        )
      );
    }
  } catch (error) {
    yield put(actions.searchDatasetsFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(LIST_DATASETS_REQUESTED, listDatasetsRequested),
    takeLatest(SEARCH_DATASETS_REQUESTED, searchDatasetsRequested)
  ]);
}
