import { Dataset } from '../utils/types';

enum STATUS {
  IDLE = 'idle',
  ERROR = 'error',
  LOADING = 'loading',
  FINISHED = 'finished',
}

enum ACTION_TYPE {
  IDLE,
  ERROR,
  LOADING,
  FINISHED,
  GET_DATASET,
  ADD_DATASET,
  REMOVE_DATASET,
  ADD_CATALOG_ID,
}

type ACTION =
  | { type: ACTION_TYPE.IDLE }
  | { type: ACTION_TYPE.LOADING }
  | { type: ACTION_TYPE.ERROR }
  | { type: ACTION_TYPE.FINISHED; payload: Dataset[] }
  | { type: ACTION_TYPE.ADD_CATALOG_ID; payload: string }
  | { type: ACTION_TYPE.GET_DATASET; payload: { datasetId: string } }
  | { type: ACTION_TYPE.ADD_DATASET; payload: { dataset: Dataset } }
  | { type: ACTION_TYPE.REMOVE_DATASET; payload: { catalogId: string } };

export { ACTION, ACTION_TYPE, STATUS };
