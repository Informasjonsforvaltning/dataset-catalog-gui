import axios from 'axios';
import memoize from 'lodash/memoize';

import env from '../../../env';

const { ORGANIZATION_API_HOST } = env;

export const organizationApi = async (method, path) =>
  axios({
    url: `${ORGANIZATION_API_HOST}/${path}`,
    method,
    headers: {
      Accept: 'application/json'
    }
  }).then(r => r.data);

const organizationApiGet = path => organizationApi('GET', path);

export const getOrganizationList = () => organizationApiGet('organizations');

export const memoizedGetOrganizationList = memoize(getOrganizationList);

export const getOrganization = orgId =>
  organizationApiGet(`organizations/${orgId}`);

export const memoizedGetOrganization = memoize(getOrganization);
