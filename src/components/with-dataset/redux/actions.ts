import {
  GET_DATASET_REQUESTED,
  GET_DATASET_SUCCEEDED,
  GET_DATASET_FAILED,
  PATCH_DATASET_SUCCEEDED,
  CREATE_DATASET_REQUESTED,
  CREATE_DATASET_SUCCEEDED,
  CREATE_DATASET_FAILED,
  DELETE_DATASET_REQUESTED,
  DELETE_DATASET_SUCCEEDED,
  DELETE_DATASET_FAILED
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

export function patchDatasetSucceeded(dataset: Dataset) {
  return {
    type: PATCH_DATASET_SUCCEEDED,
    payload: {
      dataset
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

export function deleteDatasetRequested(
  catalogId: string,
  datasetId: string,
  onSuccess?: () => void
) {
  return {
    type: DELETE_DATASET_REQUESTED,
    payload: {
      catalogId,
      datasetId,
      onSuccess
    }
  };
}

export function deleteDatasetSucceeded() {
  return {
    type: DELETE_DATASET_SUCCEEDED
  };
}

export function deleteDatasetFailed(message: string) {
  return {
    type: DELETE_DATASET_FAILED,
    payload: {
      message
    }
  };
}
