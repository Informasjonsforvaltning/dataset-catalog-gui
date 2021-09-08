import React, { memo, FC, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import pick from 'lodash/pick';
import unset from 'lodash/unset';

import { deepKeys } from '../../lib/deep-keys';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';
import withDatasets, { Props as DatasetsProps } from '../with-datasets';

import Translation from '../translation';
import FormTemplate from '../form-template/form-template.component';
import { ConnectedFormTitle } from '../form-title/connected-form-title.component';
import { FormDistribution } from '../form-distribution/form-distribution';
import { ConnectedFormSample } from '../form-sample/connected-form-sample.component';
import { ConnectedFormSpatial } from '../form-spatial/connected-form-spatial.component';
import { ConnectedFormProvenance } from '../form-provenance/connected-form-provenance.component';
import { ConnectedFormThemes } from '../form-theme/connected-form-theme.component';
import { ConnectedFormType } from '../form-type/connected-form-type.component';
import { FormConcept } from '../form-concept/form-concept.component';
import { ConnectedFormAccessRights } from '../form-accessRights/connected-form-accessRights.component';
import { ConnectedFormReference } from '../form-reference/connected-form-reference.component';
import { FormInformationModel } from '../form-informationmodel/form-informationmodel.component';
import { ConnectedFormContactPoint } from '../form-contactPoint/connected-form-contactPoint.component';
import { ConnectedFormContents } from '../form-contents/connected-form-contents.component';
import { FormPublish } from '../form-publish/form-publish';
import { ConnectedFormLOS } from '../form-los/connected-form-los.component';
import { ConnectedFormPublisher } from '../form-publisher/connected-form-publisher.component';
import { ConnectedFormQualifiedAttributions } from '../form-qualifiedAttributions/connected-form-qualified-attributions';
import LanguagePicker from '../language-picker/language-picker.component';
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
import RegistrationStatus from '../registration-status/registration-status.component';

import { selectorForDatasetsInCatalog } from '../../entrypoints/main/redux/modules/datasets';
import { selectorForDatasetFormStatus } from '../../entrypoints/main/redux/modules/dataset-form-status';
import {
  setInputLanguages as setInputLanguagesAction,
  toggleInputLanguage as toggleInputLanguageAction
} from '../language-picker/redux/actions';

import CollapseSVG from '../../images/icon-collapse-text-sm.svg';
import ExpandSVG from '../../images/icon-expand-text-sm.svg';

import './dataset-registration-page.scss';

import type { MediaType } from '../../types';
import {
  SearchType,
  RegistrationStatus as RegStatusEnum
} from '../../types/enums';
import { distributionTypes } from '../form-distribution/distribution-types';

// check the validation state of all rendered forms
const isAllowedToPublish = (form: any) =>
  !_.some(_.mapValues(form, subform => subform.syncErrors));

interface ExtenralProps {
  catalogId: string;
  datasetId: string;
  datasetItem: any;
  isReadOnly: boolean;
  allowDelegatedRegistration: boolean;
  losItems?: any[];
  themesItems?: any[];
  frequencyItems?: any[];
  openLicenseItems?: any[];
  provenanceItems?: any[];
  referenceTypesItems?: any[];
  mediaTypes?: MediaType[];
  handleDeleteDataset: () => void;
}

interface Props extends ExtenralProps, TranslationsProps, DatasetsProps {
  form: any;
  referenceDatasetsItems: any[];
  datasetFormStatus: {
    isSaving: boolean;
    error: any;
    justPublishedOrUnPublished: boolean;
  };
  languages: any[];
  setInputLanguages: (any: any) => void;
  toggleInputLanguage: () => void;
}

const DatasetRegistrationPage: FC<Props> = ({
  form,
  datasetSuggestions,
  datasetsActions: { searchDatasetsRequested: searchDatasets },
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
  handleDeleteDataset,
  languages,
  setInputLanguages,
  toggleInputLanguage,
  allowDelegatedRegistration,
  isReadOnly,
  translationsService
}) => {
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

  const [languagesDetermined, setLanguagesDetermined] = useState(false);
  const [expandAll, setExpandAll] = useState(false);

  const toggleExpand = () => setExpandAll(!expandAll);

  const translatableFields = [
    'title',
    'description',
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

  const omitDistributionLicenseField = (dataset: any) => {
    dataset?.distribution?.forEach((_item: any, index: number) => {
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
              (__: any, v: any) => !!v
            )
          )
        ]
      : [];

  const executeSearch = (query: string) => {
    if (catalogId) {
      searchDatasets(query, SearchType.DATASET, [catalogId], true, [
        RegStatusEnum.APPROVE,
        RegStatusEnum.PUBLISH
      ]);
    }
  };

  useEffect(() => {
    if (datasetItem && !languagesDetermined) {
      setInputLanguages(getUsedLanguages());
      setLanguagesDetermined(true);
    }
  }, [datasetItem]);

  useEffect(() => executeSearch(''), []);

  return (
    <div className='row mb-2 mb-md-5'>
      {datasetItem &&
        themesItems &&
        provenanceItems &&
        frequencyItems &&
        referenceTypesItems &&
        referenceDatasetsItems &&
        datasetSuggestions &&
        openLicenseItems &&
        losItems && (
          <div className='col-12'>
            <div className='d-flex align-items-center mb-5'>
              <h1 className='dataset-regitration-form-title pb-0 mb-0 mr-3'>
                {translationsService.translate(datasetItem?.title) ||
                  translationsService.translate(
                    'breadcrumbs.datasetRegistration'
                  )}
              </h1>
              <RegistrationStatus
                registrationStatus={datasetItem.registrationStatus as any}
              />
            </div>
            {!isReadOnly && (
              <LanguagePicker
                languages={languages}
                toggleInputLanguage={toggleInputLanguage}
              />
            )}
            <div className='d-flex justify-content-end'>
              <button
                type='button'
                className='toggleExpandButton'
                onClick={toggleExpand}
              >
                {expandAll ? <CollapseSVG /> : <ExpandSVG />}
                <Translation id={expandAll ? 'collapse' : 'expand'} />
              </button>
            </div>
            {allowDelegatedRegistration && (
              <FormTemplate
                title={translationsService.translate(
                  'datasets.formTemplates.onBehalf'
                )}
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
              title={translationsService.translate(
                'datasets.formTemplates.title'
              )}
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
              title={translationsService.translate(
                'datasets.formTemplates.accessRight'
              )}
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
              title={translationsService.translate(
                'datasets.formTemplates.theme'
              )}
              recommended
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
              title={translationsService.translate(
                'datasets.formTemplates.euTheme'
              )}
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
              title={translationsService.translate(
                'datasets.formTemplates.type'
              )}
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
              title={translationsService.translate(
                'datasets.formTemplates.concept'
              )}
              values={conceptValues(concept.values)}
              syncErrors={concept.syncErrors}
              showInitially={expandAll}
              recommended
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
              title={translationsService.translate(
                'datasets.formTemplates.spatial'
              )}
              values={spatialValues(spatial.values)}
              syncErrors={spatial.syncErrors}
              showInitially={expandAll}
              recommended
            >
              <ConnectedFormSpatial
                datasetItem={datasetItem}
                catalogId={catalogId}
                datasetId={datasetId}
                isReadOnly={isReadOnly}
              />
            </FormTemplate>

            <FormTemplate
              title={translationsService.translate(
                'datasets.formTemplates.provenance'
              )}
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
              title={translationsService.translate(
                'datasets.formTemplates.content'
              )}
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
              title={translationsService.translate(
                'datasets.formTemplates.informationModel'
              )}
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
              title={translationsService.translate(
                'datasets.formTemplates.reference'
              )}
              values={referenceValues(reference.values)}
              showInitially={expandAll}
              recommended
            >
              <ConnectedFormReference
                datasetItem={datasetItem as any}
                referenceTypesItems={referenceTypesItems}
                referenceDatasetsItems={datasetSuggestions}
                catalogId={catalogId}
                datasetId={datasetId}
                languages={languages}
                isReadOnly={isReadOnly}
                onInputChange={executeSearch}
              />
            </FormTemplate>

            <FormTemplate
              title={translationsService.translate(
                'datasets.formTemplates.qualifiedAttributions'
              )}
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
              title={translationsService.translate(
                'datasets.formTemplates.contactInformation'
              )}
              values={contactPointValues(contactPoint.values)}
              syncErrors={contactPoint.syncErrors}
              showInitially={expandAll}
              recommended
            >
              <ConnectedFormContactPoint
                datasetItem={datasetItem}
                catalogId={catalogId}
                datasetId={datasetId}
                isReadOnly={isReadOnly}
              />
            </FormTemplate>

            <FormTemplate
              title={translationsService.translate(
                'datasets.formTemplates.distribution'
              )}
              backgroundBlue
              values={distributionValues(distribution.values)}
              syncErrors={distribution.syncErrors}
              showInitially={expandAll}
              recommended
            >
              <FormDistribution
                initialValues={{
                  distribution: distributionTypes(datasetItem.distribution)
                }}
                openLicenseItems={openLicenseItems}
                mediaTypes={mediaTypes}
                catalogId={catalogId}
                datasetId={datasetId}
                languages={languages}
                isReadOnly={isReadOnly}
              />
            </FormTemplate>

            <FormTemplate
              title={translationsService.translate(
                'datasets.formTemplates.sample'
              )}
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
                initialItemStatus={_.get(datasetItem, 'registrationStatus', '')}
                catalogId={catalogId}
                datasetId={datasetId}
                type='dataset'
                isSaving={datasetFormStatus && datasetFormStatus.isSaving}
                lastSaved={datasetItem._lastModified}
                error={datasetFormStatus && datasetFormStatus.error}
                justPublishedOrUnPublished={
                  datasetFormStatus &&
                  datasetFormStatus.justPublishedOrUnPublished
                }
                onDelete={handleDeleteDataset}
                allowPublish={isAllowedToPublish(form)}
              />
            )}
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (state: any, { catalogId, datasetId }: any) => {
  const {
    form,
    inputLanguage: { languages }
  } = state;
  const datasetFormStatus = selectorForDatasetFormStatus(datasetId)(state);
  const referenceDatasetsItems = Object.values(
    selectorForDatasetsInCatalog(catalogId)(state)
  );

  return {
    form,
    datasetFormStatus,
    referenceDatasetsItems,
    languages
  };
};

const mapDispatchToProps = {
  setInputLanguages: setInputLanguagesAction,
  toggleInputLanguage: toggleInputLanguageAction
};

export default compose<FC<ExtenralProps>>(
  memo,
  withTranslations,
  withDatasets,
  connect(mapStateToProps, mapDispatchToProps)
)(DatasetRegistrationPage);
