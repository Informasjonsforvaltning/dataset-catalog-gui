import React, { FC, memo, useState } from 'react';

import ListItems from '../list-items/list-items.component';
import type { Dataset } from '../../types';

import './dataset-items-list.scss';

interface Props {
  catalogId: string;
  datasets: Dataset[];
}

export const DatasetItemsListPure: FC<Props> = ({ catalogId, datasets }) => {
  const [sortField, setSortField] = useState('');
  const [sortType, setSortType] = useState('');

  const onSortField = (field: string, type: string) => {
    setSortField(field);
    setSortType(type);
  };

  return (
    <ListItems
      catalogId={catalogId}
      items={datasets}
      sortField={sortField === '' ? 'none' : sortField}
      sortType={sortType}
      onSortField={onSortField}
      prefixPath={`/catalogs/${catalogId}/datasets`}
    />
  );
};

export default memo(DatasetItemsListPure);
