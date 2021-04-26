import axios, { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import AuthService from '../../../services/auth';

import {
  GET_DATASET_REQUESTED,
  CREATE_DATASET_REQUESTED,
  DELETE_DATASET_REQUESTED
} from './actions-types';
import * as actions from './actions';

import type { Dataset } from '../../../types';

const { FDK_REGISTRATION_BASE_URI } = env;

function* getDatasetRequested({
  payload: { catalogId, datasetId }
}: ReturnType<typeof actions.getDatasetRequested>) {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { data }: AxiosResponse = yield call(
      axios.get,
      `${FDK_REGISTRATION_BASE_URI}/catalogs/${catalogId}/datasets/${datasetId}`,
      {
        headers: {
          authorization,
          accept: 'application/json',
          'cache-control': 'no-cache'
        }
      }
    );

    if (data) {
      yield put(actions.getDatasetSucceeded(data as Dataset));
    } else {
      yield put(
        actions.getDatasetFailed(
          'An error occurred during an attempt to get a dataset.'
        )
      );
    }
  } catch (error) {
    yield put(actions.createDatasetFailed(error));
  }
}

function* createDatasetRequested({
  payload: { catalogId }
}: ReturnType<typeof actions.createDatasetRequested>) {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { data }: AxiosResponse = yield call(
      axios.post,
      `${FDK_REGISTRATION_BASE_URI}/catalogs/${catalogId}/datasets`,
      {},
      {
        headers: {
          authorization,
          accept: 'application/json',
          'cache-control': 'no-cache'
        }
      }
    );

    if (data) {
      yield put(actions.createDatasetSucceeded(data as Dataset));
    } else {
      yield put(
        actions.createDatasetFailed(
          'An error occurred during an attempt to create a dataset.'
        )
      );
    }
  } catch (error) {
    yield put(actions.createDatasetFailed(error));
  }
}

function* deleteDatasetRequested({
  payload: { catalogId, datasetId, onSuccess }
}: ReturnType<typeof actions.deleteDatasetRequested>) {
  try {
    const authorization: string = yield call([
      AuthService,
      AuthService.getAuthorizationHeader
    ]);

    const { status }: AxiosResponse = yield call(
      axios.delete,
      `${FDK_REGISTRATION_BASE_URI}/catalogs/${catalogId}/datasets/${datasetId}`,
      {
        headers: {
          authorization,
          accept: 'application/json',
          'cache-control': 'no-cache'
        }
      }
    );

    if (status === 200) {
      yield put(actions.deleteDatasetSucceeded());

      onSuccess?.();
    } else {
      yield put(
        actions.deleteDatasetFailed(
          'An error occurred during an attempt to delete a dataset.'
        )
      );
    }
  } catch (error) {
    yield put(actions.deleteDatasetFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATASET_REQUESTED, getDatasetRequested),
    takeLatest(CREATE_DATASET_REQUESTED, createDatasetRequested),
    takeLatest(DELETE_DATASET_REQUESTED, deleteDatasetRequested)
  ]);
}
