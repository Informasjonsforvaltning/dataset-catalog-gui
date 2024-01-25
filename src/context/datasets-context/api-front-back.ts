import axios from 'axios';

import env from '../../utils/constants/env';
import AuthService from '../../utils/authentication/auth-service';

const { FDK_REGISTRATION_BASE_URI, ORGANIZATION_API_HOST } = env;

const getDatasets = async (catalogId: string) => {
  try {
    const authorization: string = await AuthService.getAuthorizationHeader().then(header => header);

    return await axios
      .get(`${FDK_REGISTRATION_BASE_URI}/catalogs/${catalogId}/datasets`, {
        headers: {
          authorization,
          accept: 'application/json',
          'cache-control': 'no-cache',
        },
      })
      .then(response => response?.data?._embedded?.datasets);
  } catch (error) {
    console.error('getDatasets() failed!', error);
  }
};

const createDataset = async (catalogId: string) => {
  try {
    const authorization: string = await AuthService.getAuthorizationHeader().then(header => header);

    return await axios
      .post(
        `${FDK_REGISTRATION_BASE_URI}/catalogs/${catalogId}/datasets`,
        {},
        {
          headers: {
            authorization,
            accept: 'application/json',
            'cache-control': 'no-cache',
          },
        }
      )
      .then(response => response.data);
  } catch (error) {
    console.error('getDatasets() failed!', error);
  }
};

const createDatasetSeries = async (catalogId: string) => {
  try {
    const authorization: string = await AuthService.getAuthorizationHeader().then(header => header);

    return await axios
      .post(
        `${FDK_REGISTRATION_BASE_URI}/catalogs/${catalogId}/datasets`,
        {
          specializedType: 'SERIES',
        },
        {
          headers: {
            authorization,
            accept: 'application/json',
            'cache-control': 'no-cache',
          },
        }
      )
      .then(response => response.data);
  } catch (error) {
    console.error('getDatasets() failed!', error);
  }
};

const getOrganizationName = async (catalogId: string) => {
  try {
    return await axios
      .get(`${ORGANIZATION_API_HOST}/organizations/${catalogId}`)
      .then(response => response?.data?.name);
  } catch (error) {
    console.error('getOrganizationName() failed!', error);
  }
};

export { createDataset, getDatasets, createDatasetSeries, getOrganizationName };
