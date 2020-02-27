import get from 'lodash/get';
import { getConfig } from '../../../config';
import { searchApiGet } from './host';

export const searchInformationModels = params =>
  searchApiGet({
    url: `${getConfig().datasetApi.host}/api/informationmodels`,
    params
  });

export const extractInformationModels = searchResponse =>
  get(searchResponse, ['_embedded', 'informationmodels'], []);