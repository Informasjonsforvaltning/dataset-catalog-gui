import React, { memo, FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { compose } from 'redux';

import { withAuth } from '../../../utils/authentication/auth-provider';
import SC from './styled';
import { localization } from '../../../utils/language/localization';

const DatasetsPage: FC = () => {
  const { catalogId } = useParams();

  return (
    <>
      <SC.Page>
        <SC.Title>{localization.catalogType}</SC.Title>
        <SC.SubTitle>{catalogId}</SC.SubTitle>
      </SC.Page>
      <Outlet />
    </>
  );
};

export default compose<FC>(memo, withAuth)(DatasetsPage);
