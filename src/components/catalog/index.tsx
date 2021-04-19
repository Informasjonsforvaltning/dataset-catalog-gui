import React, { memo, FC } from 'react';
import { compose } from 'redux';
import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';

import env from '../../env';

import { getDatasetsCount } from '../../services/api/registration-api/datasets';
import { getConceptCount } from '../../services/api/concept-registration-api/host';
import { getRecordsCount } from '../../services/api/records-registration-api/host';
import { getDataServicesCount } from '../../services/api/dataservice-catalog/host';

import CatalogItem from '../catalog-item';

const {
  DATASERVICE_CATALOG_BASE_URI,
  CONCEPT_REGISTRATION_HOST,
  RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI
} = env;

interface ExternalProps {
  catalogId: string;
  type: string;
  isReadOnly?: boolean;
  disabled: boolean;
}

interface Props extends ExternalProps {
  itemsCount?: number;
}

const Catalog: FC<Props> = ({
  catalogId,
  type,
  itemsCount,
  isReadOnly,
  disabled
}) => {
  const getLinkUri = () => {
    switch (type) {
      case 'dataservices': {
        return `${DATASERVICE_CATALOG_BASE_URI}/${catalogId}`;
      }
      case 'concepts': {
        return `${CONCEPT_REGISTRATION_HOST}/${catalogId}`;
      }
      case 'protocol': {
        return `${RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI}/${catalogId}`;
      }
      default:
        return `/catalogs/${catalogId}/${type}`;
    }
  };

  const linkUri = getLinkUri();

  return (
    <CatalogItem
      linkUri={linkUri}
      key={catalogId}
      type={type}
      itemsCount={itemsCount}
      isReadOnly={isReadOnly}
      disabled={disabled}
    />
  );
};

const memoizedGetDatasetsCount = memoize(getDatasetsCount);
const memoizedGetDataServicesCount = memoize(getDataServicesCount);
const memoizedGetConceptCount = memoize(getConceptCount);
const memoizedGetRecordsCount = memoize(getRecordsCount);

const mapProps = {
  itemsCount: ({ type, catalogId, itemsCount }: any) => {
    switch (type) {
      case 'datasets': {
        return memoizedGetDatasetsCount(catalogId);
      }
      case 'dataservices': {
        return memoizedGetDataServicesCount(catalogId);
      }
      case 'concepts': {
        return memoizedGetConceptCount(catalogId);
      }
      case 'protocol': {
        return memoizedGetRecordsCount(catalogId);
      }
      default:
        return itemsCount;
    }
  }
};

export default compose<FC<ExternalProps>>(memo, resolve(mapProps))(Catalog);
