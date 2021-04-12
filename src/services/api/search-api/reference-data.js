import env from '../../../env';

import { searchApiGet } from './host';

const { FDK_BASE_URI } = env;

export const getReferenceData = path =>
  searchApiGet({ url: `${FDK_BASE_URI}/reference-data/${path}` });
