import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import catalog from './modules/catalog';
import { datasetsReducer } from './modules/datasets';
import catalogs from './modules/catalogs';
import { apiFormStatusReducer } from './modules/api-form-status';
import inputLanguage from '../../../components/language-picker/redux/reducer';
import { datasetFormStatus } from './modules/dataset-form-status';

import EnhetsregisteretReducer from '../../../components/with-enhetsregisteret/redux/reducer';
import KartverketReducer from '../../../components/with-kartverket/redux/reducer';
import CatalogReducer from '../../../components/with-catalog/redux/reducer';
import CatalogsReducer from '../../../components/with-catalogs/redux/reducer';
import DatasetsReducer from '../../../components/with-datasets/redux/reducer';
import DatasetReducer from '../../../components/with-dataset/redux/reducer';
import OrganizationReducer from '../../../components/with-organization/redux/reducer';
import ReferenceDataReducer from '../../../components/with-reference-data/redux/reducer';

export default combineReducers({
  form: formReducer,
  catalog,
  datasets: datasetsReducer,
  catalogs,
  apiFormStatus: apiFormStatusReducer,
  datasetFormStatus,
  inputLanguage,
  EnhetsregisteretReducer,
  KartverketReducer,
  CatalogReducer,
  CatalogsReducer,
  DatasetsReducer,
  DatasetReducer,
  OrganizationReducer,
  ReferenceDataReducer
});
