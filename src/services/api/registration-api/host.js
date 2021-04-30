import axios from 'axios';

import env from '../../../env';

import AuthService from '../../auth';

const { FDK_REGISTRATION_BASE_URI } = env;

export const registrationApi = async (method, path, data) => {
  const Authorization = await AuthService.getAuthorizationHeader();
  const response = await axios({
    url: `${FDK_REGISTRATION_BASE_URI}${path}`,
    method,
    data,
    headers: {
      Authorization,
      Accept: 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
  return response.data;
};

export const registrationApiPatch = (path, body) =>
  registrationApi('PATCH', path, body);

export const registrationApiPost = (path, body) =>
  registrationApi('POST', path, body);

export const registrationApiPut = (path, body) =>
  registrationApi('PUT', path, body);

export const registrationApiGet = path => registrationApi('GET', path);
