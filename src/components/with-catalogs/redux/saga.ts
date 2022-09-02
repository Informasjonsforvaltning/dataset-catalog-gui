import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import AuthService from '../../../services/auth/auth-service';

import { LIST_CATALOGS_REQUESTED } from './actions-types';
import * as actions from './actions';

import type { Catalog } from '../../../types';

const { FDK_REGISTRATION_BASE_URI } = env;

function* listCatalogsRequested({
  payload: { size }
}: ReturnType<typeof actions.listCatalogsRequested>) {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { data } = yield call(
      axios.get,
      `${FDK_REGISTRATION_BASE_URI}/catalogs`,
      {
        params: { size },
        headers: {
          authorization,
          accept: 'application/json',
          'cache-control': 'no-cache'
        }
      }
    );

    if (Array.isArray(data?._embedded.catalogs)) {
      yield put(
        actions.listCatalogsSucceeded(data._embedded.catalogs as Catalog[])
      );
    } else {
      yield put(
        actions.listCatalogsFailed(
          'An error occurred during an attempt to list catalogs.'
        )
      );
    }
  } catch (error: any) {
    yield put(actions.listCatalogsFailed(error));
  }
}

export default function* saga() {
  yield all([takeLatest(LIST_CATALOGS_REQUESTED, listCatalogsRequested)]);
}
