import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import pick from 'lodash/pick';
import unset from 'lodash/unset';

import localization from '../../services/localization';
import { FormTemplate } from '../../components/form-template/form-template.component';
import { ConnectedFormTitle } from './form-title/connected-form-title.component';
import { FormDistribution } from './form-distribution/form-distribution';
import { ConnectedFormSample } from './form-sample/connected-form-sample.component';
import { ConnectedFormSpatial } from './form-spatial/connected-form-spatial.component';
import { ConnectedFormProvenance } from './form-provenance/connected-form-provenance.component';
import { ConnectedFormThemes } from './form-theme/connected-form-theme.component';
import { ConnectedFormType } from './form-type/connected-form-type.component';
import { FormConcept } from './form-concept/form-concept.component';
import { ConnectedFormAccessRights } from './form-accessRights/connected-form-accessRights.component';
import { ConnectedFormReference } from './form-reference/connected-form-reference.component';
import { FormInformationModel } from './form-informationmodel/form-informationmodel.component';
import { ConnectedFormContactPoint } from './form-contactPoint/connected-form-contactPoint.component';
import { ConnectedFormContents } from './form-contents/connected-form-contents.component';
import { FormPublish } from './form-publish/form-publish';
import { ConnectedFormLOS } from './form-los/connected-form-los.component';
import { ConnectedFormPublisher } from './form-publisher/connected-form-publisher.component';
import { ConnectedFormQualifiedAttributions } from './form-qualifiedAttributions/connected-form-qualified-attributions';
import LanguagePicker from '../../components/language-picker/language-picker.component';
import {
  accessRightsValues,
  conceptValues,
  contactPointValues,
  contentsValues,
  distributionValues,
  informationModelValues,
  losValues,
  provenanceValues,
  referenceValues,
  sampleValues,
  spatialValues,
  themesValues,
  titleValues,
  typeValues
} from './dataset-registration-page.logic';
import './dataset-registration-page.scss';
import { deepKeys } from '../../lib/deep-keys';
import { RegistrationStatus } from '../../components/registration-status/registration-status.component';
import { getTranslateText } from '../../services/translateText';
import { MediaType } from '../../types';

// check the validation state of all rendered forms
const isAllowedToPublish = form =>
  !_.some(_.mapValues(form, subform => subform.syncErrors));

async function deleteAndNavigateToList({
  history,
  catalogId,
  datasetId,
  dispatchDeleteDataset
}) {
  await dispatchDeleteDataset(catalogId, datasetId);
  if (history) {
    history.push({
      pathname: `/catalogs/${catalogId}/datasets`,
      state: { confirmDelete: true }
    });
  }
}

interface DatasetRegistrationPagePureProps {
  dispatchEnsureData: (string) => void;
  dispatchDeleteDataset: () => void;
  catalogId: string;
  datasetId: string;
  themesItems: {}[];
  provenanceItems: {}[];
  frequencyItems: {}[];
  form: any;
  datasetItem: { registrationStatus: string; _lastModified: string };
  referenceTypesItems: {}[];
  referenceDatasetsItems: {}[];
  openLicenseItems: {}[];
  mediaTypes: MediaType[];
  datasetFormStatus: {
    isSaving: boolean;
    error: any;
    justPublishedOrUnPublished: boolean;
  };
  history: {}[];
  losItems: {}[];
  languages: string[];
  setInputLanguages: (any) => void;
  toggleInputLanguage: () => void;
  allowDelegatedRegistration: boolean;
  isReadOnly: boolean;
}

export function DatasetRegistrationPagePure(
  props: DatasetRegistrationPagePureProps
) {
  const {
    dispatchEnsureData,
    form,
    themesItems,
    provenanceItems,
    frequencyItems,
    datasetItem,
    referenceTypesItems,
    referenceDatasetsItems,
    openLicenseItems,
    mediaTypes,
    datasetFormStatus,
    catalogId,
    datasetId,
    losItems,
    history,
    dispatchDeleteDataset,
    languages,
    setInputLanguages,
    toggleInputLanguage,
    allowDelegatedRegistration,
    isReadOnly
  } = props;

  const {
    title = {},
    accessRights = {},
    themes = {},
    type = {},
    concept = {},
    spatial = {},
    formProvenance = {},
    contents = {},
    informationModel = {},
    reference = {},
    contactPoint = {},
    distribution = {},
    sample = {}
  } = form || {};

  useEffect(() => dispatchEnsureData(catalogId), [catalogId]);

  const [languagesDetermined, setLanguagesDetermined] = useState(false);
  const [expandAll, setExpandAll] = useState(false);

  const toggleExpand = () => {
    setExpandAll(!expandAll);
  };

  const translatableFields = [
    'title',
    'description',
    'objective',
    'legalBasisForRestriction',
    'legalBasisForProcessing',
    'legalBasisForAccess',
    'conformsTo',
    'hasCurrentnessAnnotation',
    'hasRelevanceAnnotation',
    'hasCompletenessAnnotation',
    'hasAccuracyAnnotation',
    'hasAvailabilityAnnotation',
    'informationModel',
    'distribution',
    'sample'
  ];

  const renderExpandButton = expanded => {
    const text = expanded ? localization.collapse : localization.expand;
    const icon = expanded
      ? 'icon-collapse-text-sm.svg'
      : 'icon-expand-text-sm.svg';
    const iconFile = `/img/${icon}`;

    return (
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="toggleExpandButton"
          onClick={toggleExpand}
        >
          <img className="chevronIcon" src={iconFile} alt="icon" />
          {text}
        </button>
      </div>
    );
  };

  const omitDistributionLicenseField = dataset => {
    dataset?.distribution?.forEach((item, index) => {
      unset(dataset, `distribution.${index}.license`);
    });
    return dataset;
  };

  const getUsedLanguages = () =>
    datasetItem
      ? [
          ...new Set(
            deepKeys(
              pick(
                omitDistributionLicenseField(datasetItem),
                translatableFields
              ),
              (__, v) => !!v
            )
          )
        ]
      : [];

  useEffect(() => {
    if (datasetItem && !languagesDetermined) {
      setInputLanguages(getUsedLanguages());
      setLanguagesDetermined(true);
    }
  }, [datasetItem]);

  return (
    <div className="container">
      <div className="row mb-2 mb-md-5">
        {datasetItem &&
          themesItems &&
          provenanceItems &&
          frequencyItems &&
          referenceTypesItems &&
          referenceDatasetsItems &&
          openLicenseItems &&
          losItems && (
            <div className="col-12">
              <div className="d-flex align-items-center mb-5">
                <h1 className="pb-0 mb-0 mr-3">
                  {getTranslateText(_.get(datasetItem, 'title')) ||
                    localization.breadcrumbs.datasetRegistration}
                </h1>
                <RegistrationStatus
                  registrationStatus={datasetItem.registrationStatus}
                />
              </div>
              {!isReadOnly && (
                <LanguagePicker
                  languages={languages}
                  toggleInputLanguage={toggleInputLanguage}
                />
              )}
              {renderExpandButton(expandAll)}
              {allowDelegatedRegistration && (
                <FormTemplate
                  title={localization.datasets.formTemplates.onBehalf}
                  showInitially={expandAll}
                >
                  <ConnectedFormPublisher
                    datasetItem={datasetItem}
                    catalogId={catalogId}
                    datasetId={datasetId}
                    languages={languages}
                  />
                </FormTemplate>
              )}

              <FormTemplate
                title={localization.datasets.formTemplates.title}
                required
                values={titleValues(title.values)}
                syncErrors={title.syncErrors}
                showInitially={expandAll}
              >
                <ConnectedFormTitle
                  datasetItem={datasetItem}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  languages={languages}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.accessRight}
                required
                values={accessRightsValues(accessRights.values)}
                syncErrors={accessRights.syncErrors}
                showInitially={expandAll}
              >
                <ConnectedFormAccessRights
                  datasetItem={datasetItem}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  languages={languages}
                  datasetFormStatus={datasetFormStatus}
                  losItems={losItems}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>
              <FormTemplate
                title={localization.datasets.formTemplates.theme}
                required
                values={losValues(themes.values, losItems)}
                syncErrors={themes.syncErrors}
                showInitially={expandAll}
              >
                <ConnectedFormLOS
                  datasetItem={datasetItem}
                  losItems={losItems}
                  themes={themes}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  datasetFormStatus={datasetFormStatus}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.euTheme}
                values={themesValues(themes.values)}
                syncErrors={themes.syncErrors}
                showInitially={expandAll}
              >
                <ConnectedFormThemes
                  datasetItem={datasetItem}
                  themesItems={themesItems}
                  themes={themes}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.type}
                values={typeValues(type.values)}
                syncErrors={type.syncErrors}
                showInitially={expandAll}
              >
                <ConnectedFormType
                  datasetItem={datasetItem}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  isReadOnly={isReadOnly}
                  type={type}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.concept}
                values={conceptValues(concept.values)}
                syncErrors={concept.syncErrors}
                showInitially={expandAll}
              >
                <FormConcept
                  datasetItem={datasetItem}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  languages={languages}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.spatial}
                values={spatialValues(spatial.values)}
                syncErrors={spatial.syncErrors}
                showInitially={expandAll}
              >
                <ConnectedFormSpatial
                  datasetItem={datasetItem}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.provenance}
                values={provenanceValues(formProvenance.values)}
                syncErrors={formProvenance.syncErrors}
                showInitially={expandAll}
              >
                <ConnectedFormProvenance
                  datasetItem={datasetItem}
                  provenanceItems={provenanceItems}
                  frequencyItems={frequencyItems}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  languages={languages}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.content}
                values={contentsValues(contents.values)}
                syncErrors={contents.syncErrors}
                showInitially={expandAll}
              >
                <ConnectedFormContents
                  datasetItem={datasetItem}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  languages={languages}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.informationModel}
                values={informationModelValues(informationModel.values)}
                syncErrors={informationModel.syncErrors}
                showInitially={expandAll}
              >
                <FormInformationModel
                  datasetItem={datasetItem}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  languages={languages}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.reference}
                values={referenceValues(reference.values)}
                showInitially={expandAll}
              >
                <ConnectedFormReference
                  datasetItem={datasetItem}
                  referenceTypesItems={referenceTypesItems}
                  referenceDatasetsItems={referenceDatasetsItems}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  languages={languages}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={
                  localization.datasets.formTemplates.qualifiedAttributions
                }
                showInitially={expandAll}
              >
                <ConnectedFormQualifiedAttributions
                  datasetItem={datasetItem}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.contactInformation}
                values={contactPointValues(contactPoint.values)}
                syncErrors={contactPoint.syncErrors}
                showInitially={expandAll}
              >
                <ConnectedFormContactPoint
                  datasetItem={datasetItem}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.distribution}
                backgroundBlue
                values={distributionValues(distribution.values)}
                syncErrors={distribution.syncErrors}
                showInitially={expandAll}
              >
                <FormDistribution
                  datasetItem={datasetItem}
                  openLicenseItems={openLicenseItems}
                  mediaTypes={mediaTypes}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  languages={languages}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>

              <FormTemplate
                title={localization.datasets.formTemplates.sample}
                backgroundBlue
                values={sampleValues(sample.values)}
                syncErrors={sample.syncErrors}
                showInitially={expandAll}
              >
                <ConnectedFormSample
                  datasetItem={datasetItem}
                  openLicenseItems={openLicenseItems}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  languages={languages}
                  isReadOnly={isReadOnly}
                />
              </FormTemplate>
              {!isReadOnly && (
                <FormPublish
                  initialItemStatus={_.get(
                    datasetItem,
                    'registrationStatus',
                    ''
                  )}
                  catalogId={catalogId}
                  datasetId={datasetId}
                  type="dataset"
                  isSaving={datasetFormStatus && datasetFormStatus.isSaving}
                  lastSaved={datasetItem._lastModified}
                  error={datasetFormStatus && datasetFormStatus.error}
                  justPublishedOrUnPublished={
                    datasetFormStatus &&
                    datasetFormStatus.justPublishedOrUnPublished
                  }
                  onDelete={() =>
                    deleteAndNavigateToList({
                      history,
                      catalogId,
                      datasetId,
                      dispatchDeleteDataset
                    })
                  }
                  allowPublish={isAllowedToPublish(form)}
                />
              )}
            </div>
          )}
        <div className="col-md-2" />
      </div>
    </div>
  );
}

DatasetRegistrationPagePure.defaultProps = {
  dispatchEnsureData: _.noop,
  dispatchDeleteDataset: _.noop,
  catalogId: null,
  datasetId: null,
  themesItems: null,
  provenanceItems: null,
  frequencyItems: null,
  form: {},
  datasetItem: null,
  referenceTypesItems: null,
  referenceDatasetsItems: null,
  openLicenseItems: null,
  mediaTypes: null,
  datasetFormStatus: null,
  history: null,
  losItems: null,
  languages: [],
  setInputLanguages: _.noop,
  toggleInputLanguage: _.noop,
  allowDelegatedRegistration: false,
  isReadOnly: false
};
