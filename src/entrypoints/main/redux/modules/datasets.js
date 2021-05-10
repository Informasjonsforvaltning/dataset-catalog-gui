import _ from 'lodash';
import { compose } from 'recompose';
import { datasetListAllPath } from '../../../../services/api/registration-api/datasets';
import { reduxFsaThunk } from '../../../../lib/redux-fsa-thunk';
import { registrationApiGet } from '../../../../services/api/registration-api/host';

export const DATASETS_REQUEST = 'DATASETS_REQUEST';
export const DATASETS_SUCCESS = 'DATASETS_SUCCESS';
export const DATASETS_FAILURE = 'DATASETS_FAILURE';
export const DATASET_SUCCESS = 'DATASET_SUCCESS';

function shouldFetch(metaState) {
  const threshold = 60 * 1000; // seconds
  return (
    !metaState ||
    (!metaState.isFetching &&
      (metaState.lastFetch || 0) < Date.now() - threshold)
  );
}

export const fetchDatasetsIfNeeded = catalogId => (dispatch, getState) =>
  shouldFetch(_.get(getState(), ['datasets', catalogId, 'meta'])) &&
  dispatch(
    reduxFsaThunk(() => registrationApiGet(datasetListAllPath(catalogId)), {
      onBeforeStart: { type: DATASETS_REQUEST, meta: { catalogId } },
      onSuccess: { type: DATASETS_SUCCESS, meta: { catalogId } },
      onError: { type: DATASETS_FAILURE, meta: { catalogId } }
    })
  );

export const datasetSuccessAction = dataset => ({
  type: DATASET_SUCCESS,
  payload: dataset
});

const initialState = {};

export function datasetsReducer(state = initialState, action) {
  switch (action.type) {
    case DATASETS_REQUEST:
      return {
        ...state,
        [action.meta.catalogId]: {
          meta: {
            isFetching: true,
            lastFetch: null
          }
        }
      };
    case DATASETS_SUCCESS: {
      const objFromArray = _.get(
        action.payload,
        ['_embedded', 'datasets'],
        []
      ).reduce((accumulator, current) => {
        accumulator[current.id] = current;
        return accumulator;
      }, {});
      return {
        ...state,
        [action.meta.catalogId]: {
          items: objFromArray,
          meta: {
            isFetching: false,
            lastFetch: Date.now()
          }
        }
      };
    }
    case DATASETS_FAILURE:
      return {
        ...state,
        [action.meta.catalogId]: {
          items: [],
          meta: {
            isFetching: false,
            lastFetch: Date.now()
          }
        }
      };
    case DATASET_SUCCESS: {
      const dataset = action.payload;
      const { catalogId, id } = dataset;
      const items = _.get(state, [catalogId, 'items']);
      return {
        ...state,
        [catalogId]: {
          items: {
            ...items,
            [id]: dataset
          }
        }
      };
    }
    default:
      return state;
  }
}

export const getDatasetItemByDatasetiId = (datasets, catalogId, id) =>
  _.get(datasets, [catalogId, 'items', id]);

export const selectorForDatasetsState = state => state.datasets;
export const selectorForCatalogDatasetsFromDatasetsState =
  catalogId => datasetsState =>
    _.get(datasetsState, [catalogId, 'items'], {});

export const selectorForDatasetsInCatalog = catalogId =>
  compose(
    selectorForCatalogDatasetsFromDatasetsState(catalogId),
    selectorForDatasetsState
  );
export const selectorForDataset = (catalogId, datasetId) =>
  compose(
    datasets => datasets[datasetId],
    selectorForDatasetsInCatalog(catalogId)
  );
