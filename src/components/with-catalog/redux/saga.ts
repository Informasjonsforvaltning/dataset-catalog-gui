import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import AuthService from '../../../services/auth';

import { GET_DATASET_CATALOG_REQUESTED } from './actions-types';
import * as actions from './actions';

import type { Catalog } from '../../../types';

const { FDK_REGISTRATION_BASE_URI } = env;

function* getDatasetCatalogRequested({
  payload: { id }
}: ReturnType<typeof actions.getDatasetCatalogRequested>) {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { data } = yield call(
      axios.get,
      `${FDK_REGISTRATION_BASE_URI}/catalogs/${id}`,
      {
        headers: {
          authorization,
          accept: 'application/json',
          'cache-control': 'no-cache'
        }
      }
    );

    if (data) {
      yield put(actions.getDatasetCatalogSucceeded(data as Catalog));
    } else {
      yield put(
        actions.getDatasetCatalogFailed(
          'An error occurred during an attempt to get a dataset catalog.'
        )
      );
    }
  } catch (error) {
    yield put(actions.getDatasetCatalogFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATASET_CATALOG_REQUESTED, getDatasetCatalogRequested)
  ]);
}
