import React, { FC, memo, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import localization from '../../services/localization';
import { FormCatalog } from './form-catalog/form-catalog';
import DatasetItemsList from './items-list/dataset-item-list.component';
import { AlertMessage } from '../../components/alert-message/alert-message.component';
import SC from './styled';
import withDatasets, {
  Props as SearchProps
} from '../../components/with-datasets';

import { SearchRequest, Dataset } from '../../types';
import { SearchType } from '../../types/enums';

interface Props extends RouteComponentProps, SearchProps {
  catalogId: string;
  isReadOnly: boolean;
  catalog: any;
  datasetItems: Dataset[];
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
  location,
  searchActions: { datasetsRequested: requestSearch }
}) => {
  useEffect(() => dispatchEnsureData(catalogId), [catalogId]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const searchRequest: SearchRequest = {
      searchType: SearchType.DATASET,
      catalogIDs: [catalogId],
      query: searchQuery
    };

    requestSearch(searchRequest);
  }, [searchQuery]);

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
        <SC.SearchBox role="search">
          <SC.SearchField
            type="text"
            placeholder="Søk etter datasettbeskrivelse"
            value={searchQuery}
            onChange={({ target: { value } }) => setSearchQuery(value)}
          />
          <SearchIcon />
        </SC.SearchBox>
      </SC.ListActions>
      <DatasetItemsList
        catalogId={catalogId}
        searchSort={searchQuery !== ''}
        datasetItems={datasetItems}
      />
    </SC.DatasetListPage>
  );
};

export default withDatasets(withRouter(memo(DatasetsListPagePure)));
