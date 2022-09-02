import axios from 'axios';

import env from '../../../env';

import AuthService from '../../auth/auth-service';

const { DATASERVICE_CATALOG_BASE_URI } = env;

export const getDataServices = async orgnr =>
  axios
    .get(`${DATASERVICE_CATALOG_BASE_URI}/catalogs/${orgnr}/dataservices`, {
      headers: {
        Authorization: await AuthService.getAuthorizationHeader(),
        Accept: 'application/json'
      }
    })
    .then(({ data }) => data);

export const getDataServicesCount = orgnr =>
  getDataServices(orgnr).then(dataservices => dataservices.length);
