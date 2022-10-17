import { Dataset } from '../../utils/types';
import { ACTION, ACTION_TYPE, STATUS } from '../actions';
import { produce } from 'immer';

type STATE = { status: STATUS; catalogId: string; datasets: Dataset[] };

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
    default:
      return state;
  }
});

export { STATE, reducer };
