import {
  GET_DATASET_REQUESTED,
  GET_DATASET_SUCCEEDED,
  GET_DATASET_FAILED,
  CREATE_DATASET_REQUESTED,
  CREATE_DATASET_SUCCEEDED,
  CREATE_DATASET_FAILED
} from './actions-types';

import type { Dataset } from '../../../types';

export function getDatasetRequested(catalogId: string, datasetId: string) {
  return {
    type: GET_DATASET_REQUESTED,
    payload: {
      catalogId,
      datasetId
    }
  };
}

export function getDatasetSucceeded(dataset: Dataset) {
  return {
    type: GET_DATASET_SUCCEEDED,
    payload: {
      dataset
    }
  };
}

export function getDatasetFailed(message: string) {
  return {
    type: GET_DATASET_FAILED,
    payload: {
      message
    }
  };
}

export function createDatasetRequested(catalogId: string) {
  return {
    type: CREATE_DATASET_REQUESTED,
    payload: {
      catalogId
    }
  };
}

export function createDatasetSucceeded(dataset: Dataset) {
  return {
    type: CREATE_DATASET_SUCCEEDED,
    payload: {
      dataset
    }
  };
}

export function createDatasetFailed(message: string) {
  return {
    type: CREATE_DATASET_FAILED,
    payload: {
      message
    }
  };
}
