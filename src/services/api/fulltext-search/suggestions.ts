import { searchFullTextApiGet } from './host';

export const extractSuggestions = (searchResponse: any) =>
  searchResponse.suggestions ?? [];

export const getDataserviceSuggestions = (params: any) =>
  searchFullTextApiGet('/suggestion/dataservices', params);

export const getConceptSuggestions = (params: any) =>
  searchFullTextApiGet('/suggestion/concepts', params);
