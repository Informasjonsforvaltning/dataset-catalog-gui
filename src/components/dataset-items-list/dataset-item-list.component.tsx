import React, { FC, memo } from 'react';

import ListItems from '../list-items/list-items.component';
import type { Dataset } from '../../types';

import './dataset-items-list.scss';

interface Props {
  catalogId: string;
  datasets: Dataset[];
}

export const DatasetItemsListPure: FC<Props> = ({ catalogId, datasets }) => (
  <ListItems items={datasets} prefixPath={`/catalogs/${catalogId}/datasets`} />
);

export default memo(DatasetItemsListPure);
