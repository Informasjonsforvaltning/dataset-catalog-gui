import {
  LIST_DATASETS_REQUESTED,
  LIST_DATASETS_SUCCEEDED,
  LIST_DATASETS_FAILED,
  SEARCH_DATASETS_REQUESTED,
  SEARCH_DATASETS_SUCCEEDED,
  SEARCH_DATASETS_FAILED
} from './actions-types';

import type { Dataset } from '../../../types';
import { SearchType } from '../../../types/enums';

export function listDatasetsRequested(catalogId: string, size?: number) {
  return {
    type: LIST_DATASETS_REQUESTED,
    payload: {
      catalogId,
      size
    }
  };
}

export function listDatasetsSucceeded(datasets: Dataset[]) {
  return {
    type: LIST_DATASETS_SUCCEEDED,
    payload: {
      datasets
    }
  };
}

export function listDatasetsFailed(message: string) {
  return {
    type: LIST_DATASETS_FAILED,
    payload: {
      message
    }
  };
}

export function searchDatasetsRequested(
  query: string,
  searchType: SearchType,
  catalogIDs: string[]
) {
  return {
    type: SEARCH_DATASETS_REQUESTED,
    payload: {
      query,
      searchType,
      catalogIDs
    }
  };
}

export function searchDatasetsSucceeded(datasets: Dataset[]) {
  return {
    type: SEARCH_DATASETS_SUCCEEDED,
    payload: {
      datasets
    }
  };
}

export function searchDatasetsFailed(message: string) {
  return {
    type: SEARCH_DATASETS_FAILED,
    payload: {
      message
    }
  };
}
