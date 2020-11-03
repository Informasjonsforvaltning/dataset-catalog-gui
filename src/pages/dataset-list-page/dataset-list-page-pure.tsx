import React, { FC, memo, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import AddIcon from '@material-ui/icons/Add';

import localization from '../../services/localization';
import { FormCatalog } from './form-catalog/form-catalog';
import DatasetItemsList from './items-list/dataset-item-list.component';
import { AlertMessage } from '../../components/alert-message/alert-message.component';
import SC from './styled';

interface Props extends RouteComponentProps {
  catalogId: string;
  isReadOnly: boolean;
  catalog: any;
  datasetItems: any;
  dispatchEnsureData: (catalogId: string) => void;
  onClickCreateDataset: (catalogId: string) => void;
}

export const DatasetsListPagePure: FC<Props> = ({
  isReadOnly,
  catalogId,
  catalog,
  datasetItems,
  dispatchEnsureData,
  onClickCreateDataset,
  location
}) => {
  useEffect(() => dispatchEnsureData(catalogId), [catalogId]);

  return (
    <SC.DatasetListPage>
      {_.get(location, ['state', 'confirmDelete'], false) && (
        <AlertMessage type="success">
          {localization.formStatus.type.dataset}{' '}
          {localization.formStatus.confirmDeleted}
        </AlertMessage>
      )}
      {catalog.items?.[catalogId] && (
        <FormCatalog catalogId={catalogId} isReadOnly={isReadOnly} />
      )}
      <SC.ListActions>
        {!isReadOnly && (
          <SC.CreateButton
            type="button"
            onClick={() => onClickCreateDataset(catalogId)}
          >
            <AddIcon />
            {localization.datasets.list.btnNewDataset}
          </SC.CreateButton>
        )}
      </SC.ListActions>
      <DatasetItemsList catalogId={catalogId} datasetItems={datasetItems} />
    </SC.DatasetListPage>
  );
};

export default withRouter(memo(DatasetsListPagePure));
