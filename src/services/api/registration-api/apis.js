import {
  registrationApiDelete,
  registrationApiGet,
  registrationApiPatch,
  registrationApiPost
} from './host';
import { catalogPath } from './catalogs';

export const apiCatalogPath = catalogId =>
  `${catalogPath(catalogId)}/apicatalog`;

export const apiListPath = catalogId => `${catalogPath(catalogId)}/apis`;

export const apiListAllPath = catalogId =>
  `${apiListPath(catalogId)}?size=1000`;

export const apiPath = (catalogId, apidId) =>
  `${apiListPath(catalogId)}/${apidId}`;

export const deleteApi = (catalogId, apidId) =>
  registrationApiDelete(apiPath(catalogId, apidId));

export const patchApi = (catalogId, apidId, patch) =>
  registrationApiPatch(apiPath(catalogId, apidId), patch);

export const postApi = (catalogId, newApi) =>
  registrationApiPost(apiListPath(catalogId), newApi);

export const getApiCatalog = catalogId =>
  registrationApiGet(apiCatalogPath(catalogId));

export const postApiCatalog = (catalogId, data) =>
  registrationApiPost(apiCatalogPath(catalogId), data);
