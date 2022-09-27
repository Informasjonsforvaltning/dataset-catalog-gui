import React, { memo, FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { compose } from 'redux';

import { withAuth } from '../../../utils/authentication/auth-provider';
import SC from './styled';

const EditDatasetPage: FC = () => {
  const { datasetId } = useParams();

  return (
    <>
      <SC.Page>
        <SC.Title>Dataset title</SC.Title>
        <SC.SubTitle>{datasetId}</SC.SubTitle>
      </SC.Page>
      <Outlet />
    </>
  );
};

export default compose<FC>(memo, withAuth)(EditDatasetPage);
