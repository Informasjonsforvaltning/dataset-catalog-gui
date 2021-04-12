import axios from 'axios';
import cleanDeep from 'clean-deep';

import env from '../../../env';

const { SEARCH_FULLTEXT_HOST } = env;

interface Props {
  path: string;
  method: any;
  params?: any;
}

export const searchFullTextApi = ({ path, method, params }: Props) =>
  axios({
    url: `${SEARCH_FULLTEXT_HOST}${path}`,
    method,
    params
  })
    .then(({ data }) => cleanDeep(data))
    .catch(() => null);

export const searchFullTextApiGet = (path: string, params: any) =>
  searchFullTextApi({ path, method: 'GET', params });
