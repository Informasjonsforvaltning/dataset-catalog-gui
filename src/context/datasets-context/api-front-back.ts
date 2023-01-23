import axios from 'axios';

import env from '../../utils/constants/env';
import AuthService from '../../utils/authentication/auth-service';

const { FDK_REGISTRATION_BASE_URI } = env;

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

export { createDataset, getDatasets };
