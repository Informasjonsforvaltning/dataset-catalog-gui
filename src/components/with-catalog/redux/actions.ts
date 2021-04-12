import {
  GET_DATASET_CATALOG_REQUESTED,
  GET_DATASET_CATALOG_SUCCEEDED,
  GET_DATASET_CATALOG_FAILED
} from './actions-types';

import type { Catalog } from '../../../types';

export function getDatasetCatalogRequested(id: string) {
  return {
    type: GET_DATASET_CATALOG_REQUESTED,
    payload: {
      id
    }
  };
}

export function getDatasetCatalogSucceeded(catalog: Catalog) {
  return {
    type: GET_DATASET_CATALOG_SUCCEEDED,
    payload: {
      catalog
    }
  };
}

export function getDatasetCatalogFailed(message: string) {
  return {
    type: GET_DATASET_CATALOG_FAILED,
    payload: {
      message
    }
  };
}
