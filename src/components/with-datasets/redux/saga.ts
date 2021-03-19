import { all, call, put, takeLatest } from 'redux-saga/effects';
import { authService } from '../../../services/auth/auth-service';

import { SEARCH_DATASETS_REQUESTED } from './actions-types';
import * as actions from './actions';

import { searchDatasetRegistration, searchFullTextApi } from './operations';

import type { Dataset } from '../../../types';
import { RegistrationStatus } from '../../../types/enums';

function* searchRequested({
  payload: { searchRequest }
}: ReturnType<typeof actions.searchDatasetsRequested>) {
  try {
    const auth = yield call(authService.getAuthorizationHeader);

    const [registrationSearch, fulltextSearch] = yield all([
      call(searchDatasetRegistration, searchRequest, auth),
      call(searchFullTextApi, searchRequest)
    ]);

    const internalDatasetUris = new Set(
      registrationSearch.map(({ uri }: Dataset) => uri)
    );

    const internalDatasets = registrationSearch.reduce(
      (previous, current) =>
        searchRequest.includeStatus?.has(current.registrationStatus) ?? true
          ? [...previous, { ...current, internal: true }]
          : previous,
      [] as Dataset[]
    );

    const externalDatasets = fulltextSearch.reduce(
      (previous, current) =>
        !internalDatasetUris.has(current.uri)
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
    );

    const datasets: Dataset[] = [...internalDatasets, ...externalDatasets];

    if (datasets) {
      yield put(actions.searchDatasetsSucceeded(datasets));
    } else {
      yield put(
        actions.searchDatasetsFailed(
          'An error occurred during an attempt to search the Dataset Catalog.'
        )
      );
    }
  } catch (error) {
    yield put(actions.searchDatasetsFailed(error));
  }
}

export default function* saga() {
  yield all([takeLatest(SEARCH_DATASETS_REQUESTED, searchRequested)]);
}
