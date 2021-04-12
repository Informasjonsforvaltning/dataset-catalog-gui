import React, { memo, FC } from 'react';
import { compose } from 'redux';
import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';

import env from '../../../env';

import { getConceptCount } from '../../../services/api/concept-registration-api/host';
import { getRecordsCount } from '../../../services/api/records-registration-api/host';
import { getDataServicesCount } from '../../../services/api/dataservice-catalog/host';

import CatalogItem from './catalog-item/catalog-item.component';

const {
  DATASERVICE_CATALOG_BASE_URI,
  CONCEPT_REGISTRATION_HOST,
  RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI
} = env;

interface ExternalProps {
  catalogId: string;
  type: string;
  fetchItems?: (id: string) => void;
  itemsCount?: number;
  isReadOnly?: boolean;
  disabled: boolean;
}

interface Props extends ExternalProps {}

const Catalog: FC<Props> = ({
  catalogId,
  type,
  fetchItems,
  itemsCount,
  isReadOnly,
  disabled
}) => {
  fetchItems?.(catalogId);

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

const memoizedGetDataServicesCount = memoize(getDataServicesCount);
const memoizedGetConceptCount = memoize(getConceptCount);
const memoizedGetRecordsCount = memoize(getRecordsCount);

const mapProps = {
  itemsCount: ({ type, catalogId, itemsCount }: any) => {
    switch (type) {
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
