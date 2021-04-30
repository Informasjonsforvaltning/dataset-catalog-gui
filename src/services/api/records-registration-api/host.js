import axios from 'axios';

import env from '../../../env';

import AuthService from '../../auth';

const { RECORDS_OF_PROCESSING_ACTIVITIES_BASE_URI } = env;

export const getRecords = async orgnr =>
  axios
    .get(
      `${RECORDS_OF_PROCESSING_ACTIVITIES_BASE_URI}/api/organizations/${orgnr}/records`,
      {
        headers: {
          Authorization: await AuthService.getAuthorizationHeader(),
          Accept: 'application/json'
        }
      }
    )
    .then(({ data }) => data)
    .catch(() => {});

export const getRecordsCount = orgnr =>
  getRecords(orgnr).then(data => data && data.hits && data.hits.length);
