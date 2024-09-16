import React, { FC, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { routes } from '../../router/routes';
import env from '../../utils/constants/env';
import { localization } from '../../utils/language/localization';
import SC from './styled';

const { CATALOG_PORTAL_BASE_URI } = env;

const Breadcrumbs: FC = () => {
  const [datasetId, setDatasetId] = useState('');

  const params = useParams();
  if (params.datasetId && params.datasetId !== datasetId) setDatasetId(params.datasetId);
  const activeStyle = { textDecoration: 'none' };

  let location = useLocation();
  useEffect(() => {
    setDatasetId('');
  }, [location]);

  const linkToDataset = datasetId ? `/${routes.home}/${params.datasetId}` : '';
  const linkToDatasets = `/${routes.home.replace(':catalogId', params.catalogId?.toString() ?? '')}`;

  return (
    <SC.BreadcrumbsNav>
      <span>
        <SC.ExternalLink aria-label={localization.allCatalogs} href={CATALOG_PORTAL_BASE_URI}>
          {localization.allCatalogs}
        </SC.ExternalLink>
        <span>
          <SC.CrumbDivider>{'>'}</SC.CrumbDivider>
          <SC.Link
            aria-label={localization.linkToDatasets}
            to={linkToDatasets}
            style={datasetId ? undefined : activeStyle}
            onClick={() => setDatasetId('')}
          >
            {localization.catalogType}
          </SC.Link>
        </span>
        {datasetId && (
          <span>
            <SC.CrumbDivider>{'>'}</SC.CrumbDivider>
            <SC.Link
              aria-label={localization.linkToDataset}
              to={linkToDataset}
              style={datasetId ? activeStyle : undefined}
            >
              {datasetId}
            </SC.Link>
          </span>
        )}
      </span>
    </SC.BreadcrumbsNav>
  );
};

export default Breadcrumbs;
