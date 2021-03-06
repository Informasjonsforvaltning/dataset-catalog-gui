import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash/memoize';

import { resolve } from 'react-resolver';
import { getConfig } from '../../../config';
import { CatalogItem } from './catalog-item/catalog-item.component';
import { getConceptCount } from '../../../services/api/concept-registration-api/host';
import { getRecordsCount } from '../../../services/api/records-registration-api/host';
import { getDataServicesCount } from '../../../services/api/dataservice-catalog/host';

export const CatalogPure = ({
  catalogId,
  type,
  fetchItems,
  itemsCount,
  isReadOnly,
  disabled
}) => {
  fetchItems(catalogId);

  const getLinkUri = () => {
    switch (type) {
      case 'dataservices': {
        return `${getConfig().dataServiceCatalogHost}/${catalogId}`;
      }
      case 'concepts': {
        return `${getConfig().conceptRegistrationHost}/${catalogId}`;
      }
      case 'protocol': {
        return `${getConfig().recordsOfProcessingActivitiesHost}/${catalogId}`;
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
      publisherId={catalogId}
      type={type}
      itemsCount={itemsCount}
      isReadOnly={isReadOnly}
      disabled={disabled}
    />
  );
};

CatalogPure.defaultProps = {
  catalogId: null,
  fetchItems: () => {},
  itemsCount: null,
  isReadOnly: false,
  disabled: true
};

CatalogPure.propTypes = {
  catalogId: PropTypes.string,
  type: PropTypes.string.isRequired,
  fetchItems: PropTypes.func,
  itemsCount: PropTypes.number,
  isReadOnly: PropTypes.bool,
  disabled: PropTypes.bool
};

const memoizedGetDataServicesCount = memoize(getDataServicesCount);
const memoizedGetConceptCount = memoize(getConceptCount);
const memoizedGetRecordsCount = memoize(getRecordsCount);

const mapProps = {
  itemsCount: ({ type, catalogId, itemsCount }) => {
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

export const Catalog = resolve(mapProps)(CatalogPure);
