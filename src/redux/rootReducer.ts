import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import catalog from './modules/catalog';
import { datasetsReducer } from './modules/datasets';
import catalogs from './modules/catalogs';
import { apiFormStatusReducer } from './modules/api-form-status';
import inputLanguage from '../components/language-picker/redux/reducer';
import { datasetFormStatus } from './modules/dataset-form-status';
import { referenceDataReducer } from './modules/referenceData';

import EnhetsregisteretReducer from '../components/with-enhetsregisteret/redux/reducer';
import KartverketReducer from '../components/with-kartverket/redux/reducer';
import DatasetsReducer from '../components/with-datasets/redux/reducer';

export default combineReducers({
  form: formReducer,
  catalog,
  datasets: datasetsReducer,
  catalogs,
  apiFormStatus: apiFormStatusReducer,
  datasetFormStatus,
  referenceData: referenceDataReducer,
  inputLanguage,
  EnhetsregisteretReducer,
  KartverketReducer,
  DatasetsReducer
});
