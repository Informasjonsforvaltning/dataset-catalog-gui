import { Dataset } from '../../utils/types';
import { ACTION, ACTION_TYPE, STATUS } from '../actions';
import { produce } from 'immer';
import { createDataset, createDatasetSeries } from './api-front-back';

type STATE = { status: STATUS; catalogId: string; organizationName: string; datasets: Dataset[]; newlyCreatedDatasetPromise?: Promise<Dataset> };

const reducer = produce((state: STATE, action: ACTION) => {
  switch (action.type) {
    case ACTION_TYPE.LOADING:
      state.status = STATUS.LOADING;
      return state;
    case ACTION_TYPE.FINISHED:
      state.status = STATUS.FINISHED;
      state.datasets = action.payload;
      state.status = STATUS.IDLE;
      return state;
    case ACTION_TYPE.ERROR:
      state.status = STATUS.ERROR;
      return state;
    case ACTION_TYPE.ADD_CATALOG_ID:
      state.catalogId = action.payload;
      return state;
    case ACTION_TYPE.SET_ORGANIZATION_NAME:
      state.organizationName = action.payload;
      return state;
    case ACTION_TYPE.ADD_DATASET:
      state.datasets.push(action.payload.dataset);
      state.newlyCreatedDatasetPromise = undefined;
      return state;
    case ACTION_TYPE.CREATE_DATASET:
      state.newlyCreatedDatasetPromise = createDataset(state.catalogId)
        .then(response => response)
        .catch(error => console.error(error));
      return state;
    case ACTION_TYPE.CREATE_DATASET_SERIES:
      state.newlyCreatedDatasetPromise = createDatasetSeries(state.catalogId)
        .then(response => response)
        .catch(error => console.error(error));
      return state;
    default:
      return state;
  }
});

export { STATE, reducer };
