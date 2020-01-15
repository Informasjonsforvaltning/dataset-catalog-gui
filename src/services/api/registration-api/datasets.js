import {
  registrationApiDelete,
  registrationApiPatch,
  registrationApiPost,
  registrationApiPut
} from './host';
import { catalogPath } from './catalogs';

export const datasetListPath = catalogId =>
  `${catalogPath(catalogId)}/datasets`;

export const datasetListAllPath = catalogId =>
  `${datasetListPath(catalogId)}?size=1000`;

export const datasetPath = (catalogId, datasetId) =>
  `${datasetListPath(catalogId)}/${datasetId}`;

export const deleteDataset = (catalogId, datasetId) =>
  registrationApiDelete(datasetPath(catalogId, datasetId));

export const patchDataset = (catalogId, datasetId, patch) =>
  registrationApiPatch(datasetPath(catalogId, datasetId), patch);

export const createDataset = catalogId =>
  registrationApiPost(datasetListPath(catalogId), {});

export const saveCatalog = catalog =>
  registrationApiPut(catalogPath(catalog.id), catalog);
