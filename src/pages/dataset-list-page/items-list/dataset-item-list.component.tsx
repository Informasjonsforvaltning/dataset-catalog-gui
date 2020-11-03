import React, { FC, memo, useState } from 'react';

import localization from '../../../services/localization';
import { ListItemsPure } from '../../../components/list-items/list-items.component';
import './dataset-items-list.scss';

interface Props {
  isReadOnly: boolean;
  catalogId: string;
  datasetItems: any;
  onClickCreateDataset: (catalogId: string) => void;
}

export const DatasetItemsListPure: FC<Props> = ({
  isReadOnly,
  catalogId,
  datasetItems,
  onClickCreateDataset
}) => {
  const [sortField, setSortField] = useState('');
  const [sortType, setSortType] = useState('');

  const onSortField = (field, type) => {
    setSortField(field);
    setSortType(type);
  };

  return (
    <div>
      {!isReadOnly && (
        <div className="d-flex mb-3">
          <button
            type="button"
            className="fdk-button fdk-button-cta"
            onClick={() => onClickCreateDataset(catalogId)}
          >
            <i className="fa fa-plus fdk-color-white mr-2" />
            {localization.datasets.list.btnNewDataset}
          </button>
        </div>
      )}

      <ListItemsPure
        catalogId={catalogId}
        items={datasetItems}
        sortField={sortField}
        sortType={sortType}
        onSortField={onSortField}
        prefixPath={`/catalogs/${catalogId}/datasets`}
      />
    </div>
  );
};

export default memo(DatasetItemsListPure);
