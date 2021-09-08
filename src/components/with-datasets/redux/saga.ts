import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import AuthService from '../../../services/auth';

import {
  LIST_DATASETS_REQUESTED,
  SEARCH_DATASETS_REQUESTED
} from './actions-types';
import * as actions from './actions';

import type { Dataset } from '../../../types';
import { RegistrationStatus } from '../../../types/enums';

const { FDK_REGISTRATION_BASE_URI, SEARCH_FULLTEXT_HOST } = env;

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
  } catch (error: any) {
    yield put(actions.listDatasetsFailed(error));
  }
}

function* searchDatasetsRequested({
  payload: {
    query,
    searchType,
    includeStatus,
    catalogIds: catalogIDs,
    includeExternalDatasets
  }
}: ReturnType<typeof actions.searchDatasetsRequested>) {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { registration, fulltext } = yield all({
      registration: call(
        axios.post,
        `${FDK_REGISTRATION_BASE_URI}/search`,
        { query, searchType, catalogIDs },
        { headers: { authorization } }
      ),
      fulltext: includeExternalDatasets
        ? call(axios.get, `${SEARCH_FULLTEXT_HOST}/suggestion/datasets`, {
            headers: { authorization },
            params: { q: query }
          })
        : null
    });

    const internalDatasetUris: string[] =
      registration?.data?.datasets?.map(({ uri }: Dataset) => uri) ?? [];

    const internalDatasets =
      registration?.data?.datasets?.reduce(
        (previous: any, current: any) =>
          includeStatus?.includes(current?.registrationStatus) ?? true
            ? [...previous, { ...current, internal: true }]
            : previous,
        [] as Dataset[]
      ) ?? [];

    const externalDatasets =
      fulltext?.data?.suggestions?.reduce(
        (previous: any, current: any) =>
          !internalDatasetUris.includes(current.uri)
            ? [
                ...previous,
                {
                  ...current,
                  internal: false,
                  registrationStatus: RegistrationStatus.PUBLISH
                }
              ]
            : previous,
        [] as Dataset[]
      ) ?? [];

    const datasets: Dataset[] = [...internalDatasets, ...externalDatasets];

    if (Array.isArray(datasets)) {
      yield put(actions.searchDatasetsSucceeded(datasets));
    } else {
      yield put(
        actions.searchDatasetsFailed(
          'An error occurred during an attempt to search the dataset catalog.'
        )
      );
    }
  } catch (error: any) {
    yield put(actions.searchDatasetsFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(LIST_DATASETS_REQUESTED, listDatasetsRequested),
    takeLatest(SEARCH_DATASETS_REQUESTED, searchDatasetsRequested)
  ]);
}
