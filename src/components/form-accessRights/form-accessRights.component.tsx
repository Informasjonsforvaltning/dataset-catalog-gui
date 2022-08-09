import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field, FieldArray } from 'redux-form';
import includes from 'lodash/includes';

import { isNapPublish, isNapUnPublishAccessRights } from '../../lib/napPublish';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Translation from '../translation';
import Helptext from '../helptext/helptext.component';
import InputField from '../fields/field-input/field-input.component';
import InputFieldReadonly from '../fields/field-input-readonly/field-input-readonly.component';
import MultilingualField from '../multilingual-field/multilingual-field.component';
import LinkReadonlyField from '../fields/field-link-readonly/field-link-readonly.component';
import RadioField from '../fields/field-radio/field-radio.component';
import { legalBasisType } from '../../schemaTypes';
import { datasetFormPatchThunk } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';
import AlertMessage from '../alert-message/alert-message.component';

/*
 Resets fields when radio button "Offentlig" is chosen.
 */
const resetFields = (change: any) => {
  change('legalBasisForRestriction', [legalBasisType]);
  change('legalBasisForProcessing', [legalBasisType]);
  change('legalBasisForAccess', [legalBasisType]);
};
const getAccessRightLabel = (value: string) => {
  switch (value) {
    case 'http://publications.europa.eu/resource/authority/access-right/PUBLIC':
      return 'schema.accessRights.publicLabel';
    case 'http://publications.europa.eu/resource/authority/access-right/RESTRICTED':
      return 'schema.accessRights.restrictedLabel';
    case 'http://publications.europa.eu/resource/authority/access-right/NON_PUBLIC':
      return 'schema.accessRights.nonPublicLabel';
    default:
      return '';
  }
};

interface LegalBasisFieldsProps {
  item: Record<string, unknown>;
  index: number;
  fields: any;
  titleLabel: string;
  linkLabel: string;
  onDeleteFieldAtIndex: (any: any, number: number) => void;
  languages: string[];
  isReadOnly: boolean;
}

export const renderLegalBasisFields = ({
  item,
  index,
  fields,
  titleLabel,
  linkLabel,
  onDeleteFieldAtIndex,
  languages,
  isReadOnly
}: LegalBasisFieldsProps) => (
  <div className='d-flex flex-column mb-5' key={index}>
    <MultilingualField
      name={`${item}.prefLabel`}
      component={isReadOnly ? InputFieldReadonly : InputField}
      label={titleLabel}
      showLabel
      languages={languages}
    />
    <div className='mt-2'>
      <Field
        name={`${item}.uri`}
        component={isReadOnly ? LinkReadonlyField : InputField}
        label={linkLabel}
        showLabel
      />
    </div>
    {!isReadOnly && (
      <div className='d-flex align-items-end'>
        <button
          className='fdk-btn-no-border'
          type='button'
          title='Remove legal basis'
          onClick={() => onDeleteFieldAtIndex(fields, index)}
        >
          <i className='fa fa-trash mr-2' />
        </button>
      </div>
    )}
  </div>
);

interface LegalBasisProps {
  fields: any;
  titleLabel: string;
  linkLabel: string;
  onDeleteFieldAtIndex: (any: any, number: number) => void;
  languages: string[];
  isReadOnly: boolean;
}

export const renderLegalBasis = ({
  fields,
  titleLabel,
  linkLabel,
  onDeleteFieldAtIndex,
  languages,
  isReadOnly
}: LegalBasisProps) => (
  <div>
    {fields?.map((item: any, index: number) =>
      renderLegalBasisFields({
        item,
        index,
        fields,
        titleLabel,
        linkLabel,
        onDeleteFieldAtIndex,
        languages,
        isReadOnly
      })
    )}
    {!isReadOnly && (
      <button
        className='fdk-btn-no-border'
        type='button'
        onClick={() => fields.push({})}
      >
        <i className='fa fa-plus mr-2' />
        <Translation id='schema.common.add' />
      </button>
    )}
  </div>
);

interface FormAccessRightsProps extends TranslationsProps {
  hasAccessRightsURI: string;
  dispatch: (any: any) => void;
  catalogId: string;
  datasetId: string;
  languages: Record<string, unknown>[];
  datasetFormStatus: { lastChangedFields: string[] };
  datasetItem: { accessRights: { uri: string } };
  losItems: Record<string, unknown>[];
  isReadOnly: boolean;
  change: (key: string, value: any) => void;
}

const FormAccessRights: FC<FormAccessRightsProps> = ({
  hasAccessRightsURI,
  dispatch,
  catalogId,
  datasetId,
  languages = [],
  datasetFormStatus,
  datasetItem,
  losItems,
  isReadOnly,
  change,
  translationsService
}) => {
  const deleteFieldAtIndex = (fields: any, index: number) => {
    const values = fields.getAll();
    // use splice instead of skip, for changing the bound value
    values.splice(index, 1);
    const patch = { [fields.name]: values };
    const thunk = datasetFormPatchThunk({
      catalogId,
      datasetId,
      datasetItem,
      patch
    });
    dispatch(thunk);
  };
  return (
    <form>
      <div className='form-group mb-0'>
        <Helptext
          title={translationsService.translate('schema.accessRights.heading')}
          term='Dataset_accessRights'
          required
        />
        {isReadOnly && (
          <div className='pl-3'>
            <Translation
              id={getAccessRightLabel(datasetItem?.accessRights?.uri)}
            />
          </div>
        )}
        {!isReadOnly && (
          <>
            <Field
              name='accessRights.uri'
              radioId='accessRight-public'
              component={RadioField}
              type='radio'
              value='http://publications.europa.eu/resource/authority/access-right/PUBLIC'
              label={translationsService.translate(
                'schema.accessRights.publicLabel'
              )}
              onChange={() => resetFields(change)}
            />
            <Field
              name='accessRights.uri'
              radioId='accessRight-restricted'
              component={RadioField}
              type='radio'
              value='http://publications.europa.eu/resource/authority/access-right/RESTRICTED'
              label={translationsService.translate(
                'schema.accessRights.restrictedLabel'
              )}
            />
            <Field
              name='accessRights.uri'
              radioId='accessRight-non_public'
              component={RadioField}
              type='radio'
              value='http://publications.europa.eu/resource/authority/access-right/NON_PUBLIC'
              label={translationsService.translate(
                'schema.accessRights.nonPublicLabel'
              )}
            />
          </>
        )}

        {datasetFormStatus &&
          includes(datasetFormStatus.lastChangedFields, 'accessRights') &&
          isNapPublish(losItems, datasetItem) && (
            <AlertMessage type='info'>
              <span>
                <Translation id='formStatus.napPublish' />
              </span>
            </AlertMessage>
          )}

        {datasetFormStatus &&
          includes(datasetFormStatus.lastChangedFields, 'accessRights') &&
          isNapUnPublishAccessRights(losItems, datasetItem) && (
            <AlertMessage type='info'>
              <span>
                <Translation id='formStatus.napUnPublish' />
              </span>
            </AlertMessage>
          )}

        {(hasAccessRightsURI ===
          'http://publications.europa.eu/resource/authority/access-right/RESTRICTED' ||
          hasAccessRightsURI ===
            'http://publications.europa.eu/resource/authority/access-right/NON_PUBLIC') && (
          <div className='mt-4'>
            <div className='form-group mb-0'>
              <Helptext
                title={translationsService.translate(
                  'schema.accessRights.legalBasisForRestriction.heading'
                )}
                term='Dataset_legalBasisForRestriction'
              />
              <FieldArray
                name='legalBasisForRestriction'
                component={renderLegalBasis as any}
                titleLabel={translationsService.translate(
                  'schema.accessRights.legalBasisForRestriction.titleLabel'
                )}
                linkLabel={translationsService.translate(
                  'schema.accessRights.legalBasisForRestriction.linkLabel'
                )}
                onDeleteFieldAtIndex={deleteFieldAtIndex}
                languages={languages}
                isReadOnly={isReadOnly}
              />
            </div>

            <div className='form-group mb-0'>
              <Helptext
                title={translationsService.translate(
                  'schema.accessRights.legalBasisForProcessing.heading'
                )}
                term='Dataset_legalBasisForProcessing'
              />
              <FieldArray
                name='legalBasisForProcessing'
                component={renderLegalBasis as any}
                titleLabel={translationsService.translate(
                  'schema.accessRights.legalBasisForProcessing.titleLabel'
                )}
                linkLabel={translationsService.translate(
                  'schema.accessRights.legalBasisForProcessing.linkLabel'
                )}
                onDeleteFieldAtIndex={deleteFieldAtIndex}
                languages={languages}
                isReadOnly={isReadOnly}
              />
            </div>

            <div className='form-group mb-0'>
              <Helptext
                title={translationsService.translate(
                  'schema.accessRights.legalBasisForAccess.heading'
                )}
                term='Dataset_legalBasisForAccess'
              />
              <FieldArray
                name='legalBasisForAccess'
                component={renderLegalBasis as any}
                titleLabel={translationsService.translate(
                  'schema.accessRights.legalBasisForAccess.titleLabel'
                )}
                linkLabel={translationsService.translate(
                  'schema.accessRights.legalBasisForAccess.linkLabel'
                )}
                onDeleteFieldAtIndex={deleteFieldAtIndex}
                languages={languages}
                isReadOnly={isReadOnly}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default compose<FC>(memo, withTranslations)(FormAccessRights);
