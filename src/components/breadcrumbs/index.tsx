import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { routes } from '../../router/routes';
import env from '../../utils/constants/env';
import { localization } from '../../utils/language/localization';
import SC from './styled';

const { FDK_REGISTRATION_BASE_URI } = env;

const Breadcrumbs: FC = () => {
  const [datasetId, setDatasetId] = useState('');

  const params = useParams();
  if (params.datasetId && params.datasetId !== datasetId) setDatasetId(params.datasetId);
  const activeStyle = { textDecoration: 'none' };

  return (
    <SC.BreadcrumbsNav>
      <span>
        <SC.Link to={FDK_REGISTRATION_BASE_URI}>{localization.allCatalogs}</SC.Link>
        <span>
          <SC.CrumbDivider>{'>'}</SC.CrumbDivider>
          <SC.Link to={`/${routes.home}`} style={datasetId ? undefined : activeStyle} onClick={() => setDatasetId('')}>
            {localization.catalogType}
          </SC.Link>
        </span>
        {datasetId ? (
          <span>
            <SC.CrumbDivider>{'>'}</SC.CrumbDivider>
            <SC.Link to={`/${routes.home}/${params.datasetId}`} style={datasetId ? activeStyle : undefined}>
              {datasetId}
            </SC.Link>
          </span>
        ) : undefined}
      </span>
    </SC.BreadcrumbsNav>
  );
};

export default Breadcrumbs;
