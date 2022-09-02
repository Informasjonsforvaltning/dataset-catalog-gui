import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import Breadcrumbs, { Breadcrumb } from '@fellesdatakatalog/breadcrumbs';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import env from '../../../../../../env';

import { withAuth } from '../../../../../../providers/auth';
import { authService } from '../../../../../../services/auth/auth-service';

import withCatalog, {
  Props as CatalogProps
} from '../../../../../../components/with-catalog';
import withDatasets, {
  Props as DatasetsProps
} from '../../../../../../components/with-datasets';
import withDataset, {
  Props as DatasetProps
} from '../../../../../../components/with-dataset';

import Translation from '../../../../../../components/translation';
import { FormCatalog } from '../../../../../../components/form-catalog/form-catalog';
import DatasetItemsList from '../../../../../../components/dataset-items-list/dataset-item-list.component';
import AlertMessage from '../../../../../../components/alert-message/alert-message.component';

import SC from './styled';

import { SearchType } from '../../../../../../types/enums';

const { FDK_REGISTRATION_BASE_URI } = env;

interface RouteParams {
  catalogId: string;
}

interface LocationState {
  confirmDelete?: boolean;
}

interface Props extends CatalogProps, DatasetsProps, DatasetProps {}

const DatasetsPage: FC<Props> = ({
  datasetCatalog,
  datasets,
  datasetSuggestions,
  createdDataset,
  catalogActions: { getDatasetCatalogRequested: getDatasetCatalog },
  datasetsActions: {
    listDatasetsRequested: listDatasets,
    searchDatasetsRequested: searchDatasets
  },
  datasetActions: { createDatasetRequested: createDataset }
}) => {
  const { catalogId } = useParams<RouteParams>();
  const { state } = useLocation<LocationState>();
  const { push } = useHistory();
  const { url } = useRouteMatch();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getDatasetCatalog(catalogId);
    listDatasets(catalogId, 1000);
  }, []);

  useEffect(() => {
    if (createdDataset) {
      push(`${url}/${createdDataset.id}`);
    }
  }, [createdDataset?.id]);

  useEffect(() => {
    searchDatasets(searchQuery, SearchType.DATASET, [catalogId]);
  }, [searchQuery]);

  const isReadOnly =
    !authService.hasSystemAdminPermission() &&
    !authService.hasOrganizationWritePermission(catalogId);

  const createNewDataset = () => createDataset(catalogId);

  return (
    <>
      <Breadcrumbs as={SC.Breadcrumbs}>
        <Breadcrumb>
          <a href={FDK_REGISTRATION_BASE_URI}>
            <Translation id='breadcrumbs.home' />
          </a>
        </Breadcrumb>
        <Breadcrumb active>
          <Translation id='Datasettkatalog' />
        </Breadcrumb>
      </Breadcrumbs>
      <SC.Page>
        {state?.confirmDelete && (
          <AlertMessage type='success'>
            <Translation id='formStatus.confirmDeletedDataset' />
          </AlertMessage>
        )}
        {datasetCatalog && (
          <FormCatalog
            catalog={datasetCatalog}
            catalogId={catalogId}
            isReadOnly={isReadOnly}
          />
        )}
        <SC.ListActions>
          <SC.CreateButton
            type='button'
            disabled={isReadOnly}
            onClick={createNewDataset}
          >
            <AddIcon />
            <Translation id='datasets.list.btnNewDataset' />
          </SC.CreateButton>
          <SC.SearchBox role='search'>
            <SC.SearchField
              type='text'
              placeholder='Søk etter datasettbeskrivelse'
              value={searchQuery}
              onChange={({ target: { value } }) => setSearchQuery(value)}
            />
            <SearchIcon />
          </SC.SearchBox>
        </SC.ListActions>
        <DatasetItemsList
          catalogId={catalogId}
          datasets={searchQuery ? datasetSuggestions : datasets}
        />
      </SC.Page>
    </>
  );
};

export default compose<FC>(
  memo,
  withAuth,
  withCatalog,
  withDatasets,
  withDataset
)(DatasetsPage);
