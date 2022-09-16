import React, { memo, FC, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { compose } from 'redux';
import Breadcrumbs, { Breadcrumb } from '@fellesdatakatalog/breadcrumbs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

import env from '../../../utils/constants/env';
import { withAuth } from '../../../utils/authentication/auth-provider';
import SC from './styled';
import { localization } from '../../../utils/language/localization';
import { routes } from '../../../router/routes';

const DatasetsPage: FC = () => {
  const { FDK_REGISTRATION_BASE_URI } = env;
  const { catalogId } = useParams();
  const [query, setQuery] = useState(localization.searchForDatasetDescription);

  return (
    <>
      <Breadcrumbs as={SC.Breadcrumbs}>
        <Breadcrumb>
          <a href={FDK_REGISTRATION_BASE_URI}>{localization.allCatalogs}</a>
        </Breadcrumb>
        <Breadcrumb active>
          <Link to={`/${routes.home}/${catalogId}`}>{localization.catalogType}</Link>
        </Breadcrumb>
      </Breadcrumbs>
      <SC.Page>
        <SC.Title>{localization.catalogType}</SC.Title>
        <SC.SubTitle>{catalogId}</SC.SubTitle>
        <SC.ListActions>
          <SC.CreateButton
            type='button'
            disabled={!query || query === localization.searchForDatasetDescription}
            onClick={() => {}}
          >
            <AddCircleOutlineIcon />
            {localization.addNewDatasettDescriptionBtn}
          </SC.CreateButton>
          <SC.SearchBox role='search'>
            <SC.SearchField
              type='text'
              placeholder={localization.searchForDatasetDescription}
              value={query && query !== localization.searchForDatasetDescription ? query : ''}
              onChange={event => setQuery(event.target.value)}
            />
            <SearchIcon />
          </SC.SearchBox>
        </SC.ListActions>
      </SC.Page>
      <Outlet />
    </>
  );
};

export default compose<FC>(memo, withAuth)(DatasetsPage);
