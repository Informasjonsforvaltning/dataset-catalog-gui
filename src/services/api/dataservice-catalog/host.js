import axios from 'axios';
import { authService } from '../../auth/auth-service';
import { getConfig } from '../../../config';

export const getDataServices = async orgnr =>
  axios
    .get(
      `${getConfig().dataServiceCatalogHost}/catalogs/${orgnr}/dataservices`,
      {
        headers: {
          Authorization: await authService.getAuthorizationHeader(),
          Accept: 'application/json'
        }
      }
    )
    .then(response => response.data);

export const getDataServicesCount = orgnr =>
  getDataServices(orgnr).then(dataservices => dataservices.length);
