import React, { memo, FC } from 'react';
import { compose } from 'redux';
import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';

import { getDatasetsCount } from '../../services/api/registration-api/datasets';

import CatalogItem from '../catalog-item';

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
  const getLinkUri = () => `/catalogs/${catalogId}/${type}`;

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

const mapProps = {
  itemsCount: ({ type, catalogId, itemsCount }: any) => {
    switch (type) {
      case 'datasets': {
        return memoizedGetDatasetsCount(catalogId);
      }
      default:
        return itemsCount;
    }
  }
};

export default compose<FC<ExternalProps>>(memo, resolve(mapProps))(Catalog);
