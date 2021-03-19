import axios from 'axios';
import { SearchRequest } from '../../../types';
import { getConfig } from '../../../config';

export const searchDatasetRegistration = async (
  searchRequest: SearchRequest,
  auth: string
) => {
  const { data } = await axios.post(
    `${getConfig().registrationApi.host}/search`,
    searchRequest,
    {
      headers: { Authorization: auth }
    }
  );

  return data.datasets ?? [];
};

export const searchFullTextApi = async (searchRequest: SearchRequest) => {
  if (searchRequest.includeExternalDatasets) {
    const {
      data
    } = await axios.get(
      'https://search.staging.fellesdatakatalog.digdir.no/suggestion/datasets',
      { params: { q: searchRequest.query } }
    );

    return data.suggestions ?? [];
  }
  return [];
};
