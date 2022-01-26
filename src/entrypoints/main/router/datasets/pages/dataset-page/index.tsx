import React, { memo, FC, useEffect } from 'react';
import { compose } from 'redux';
import { Link as RouteLink, useParams, useHistory } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Link from '@fellesdatakatalog/link';
import Breadcrumbs, { Breadcrumb } from '@fellesdatakatalog/breadcrumbs';

import env from '../../../../../../env';

import { withAuth, Props as AuthProps } from '../../../../../../providers/auth';

import withDataset, {
  Props as DatasetProps
} from '../../../../../../components/with-dataset';
import withOrganization, {
  Props as OrganizationProps
} from '../../../../../../components/with-organization';
import withReferenceData, {
  Props as ReferenceDataProps
} from '../../../../../../components/with-reference-data';

import Translation from '../../../../../../components/translation';
import DatasetRegistrationForm from '../../../../../../components/dataset-registration-form';

import SC from './styled';

import { ReferenceDataCode } from '../../../../../../types/enums';

const { FDK_REGISTRATION_BASE_URI } = env;

interface RouteParams {
  catalogId: string;
  datasetId: string;
}

interface Props
  extends AuthProps,
    DatasetProps,
    OrganizationProps,
    ReferenceDataProps {}

const DatasetPage: FC<Props> = ({
  dataset,
  organization,
  referenceData,
  isLoadingDataset,
  datasetActions: {
    getDatasetRequested: getDataset,
    deleteDatasetRequested: deleteDataset
  },
  organizationActions: { getOrganizationRequested: getOrganization },
  referenceDataActions: {
    getReferenceDataRequested: getReferenceData,
    getNewReferenceDataRequested: getNewReferenceData
  },
  authService
}) => {
  const { catalogId, datasetId } = useParams<RouteParams>();
  const { replace } = useHistory();

  const referenceDataCodes = [
    ReferenceDataCode.FREQUENCY,
    ReferenceDataCode.OPEN_LICENCES,
    ReferenceDataCode.PROVENANCE,
    ReferenceDataCode.REFERENCE_TYPES
  ];

  const newReferenceDataCodes = [
    ReferenceDataCode.LOS,
    ReferenceDataCode.THEMES,
    ReferenceDataCode.MEDIA_TYPES
  ];

  useEffect(() => {
    getDataset(catalogId, datasetId);

    if (organization?.id !== catalogId) {
      getOrganization(catalogId);
    }

    if (
      !referenceDataCodes.every(code =>
        Object.keys(referenceData).includes(code)
      )
    ) {
      getReferenceData(
        referenceDataCodes.filter(
          code => !Object.keys(referenceData).includes(code)
        )
      );
    }

    if (
      !newReferenceDataCodes.every(code =>
        Object.keys(referenceData).includes(code)
      )
    ) {
      getNewReferenceData(
        newReferenceDataCodes.filter(
          code => !Object.keys(referenceData).includes(code)
        )
      );
    }
  }, []);

  const handleDeleteDataset = () =>
    deleteDataset(catalogId, datasetId, () =>
      replace(`/catalogs/${catalogId}/datasets`, { confirmDelete: true })
    );

  const isReadOnly =
    !authService.hasSystemAdminPermission() &&
    !authService.hasOrganizationWritePermission(catalogId);

  const allowDelegatedRegistration =
    organization?.allowDelegatedRegistration ?? false;

  return (
    <>
      <Breadcrumbs as={SC.Breadcrumbs}>
        <Breadcrumb>
          <a href={FDK_REGISTRATION_BASE_URI}>
            <Translation id='breadcrumbs.home' />
          </a>
        </Breadcrumb>
        <Breadcrumb>
          <Link to='/catalogs' as={RouteLink}>
            <Translation id='catalogs.title' />
          </Link>
        </Breadcrumb>
        <Breadcrumb>
          <Link to={`/catalogs/${catalogId}/datasets`} as={RouteLink}>
            <Translation id='Datasettkatalog' />
          </Link>
        </Breadcrumb>
        <Breadcrumb active>
          {isLoadingDataset && <Skeleton width={200} />}
          {!isLoadingDataset &&
            (Object.values(dataset?.title ?? {}).some(Boolean) ? (
              <Translation object={dataset?.title} />
            ) : (
              <Translation id='breadcrumbs.datasetRegistration' />
            ))}
        </Breadcrumb>
      </Breadcrumbs>
      <SC.Page>
        <DatasetRegistrationForm
          catalogId={catalogId}
          datasetId={datasetId}
          datasetItem={dataset}
          isReadOnly={isReadOnly}
          allowDelegatedRegistration={allowDelegatedRegistration}
          losItems={referenceData[ReferenceDataCode.LOS]?.losNodes}
          themesItems={referenceData[ReferenceDataCode.THEMES]?.dataThemes}
          frequencyItems={referenceData[ReferenceDataCode.FREQUENCY]}
          openLicenseItems={referenceData[ReferenceDataCode.OPEN_LICENCES]}
          provenanceItems={referenceData[ReferenceDataCode.PROVENANCE]}
          referenceTypesItems={referenceData[ReferenceDataCode.REFERENCE_TYPES]}
          mediaTypes={referenceData[ReferenceDataCode.MEDIA_TYPES]?.mediaTypes}
          handleDeleteDataset={handleDeleteDataset}
        />
      </SC.Page>
    </>
  );
};

export default compose<FC>(
  memo,
  withAuth,
  withDataset,
  withOrganization,
  withReferenceData
)(DatasetPage);
