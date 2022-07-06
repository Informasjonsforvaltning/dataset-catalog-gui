import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field, FieldArray } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps,
  Language
} from '../../providers/translations';

import Translation from '../translation';
import Helptext from '../helptext/helptext.component';
import SelectField from '../fields/field-select/field-select.component';
import MultilingualField from '../multilingual-field/multilingual-field.component';
import InputField from '../fields/field-input/field-input.component';
import InputFieldReadonly from '../fields/field-input-readonly/field-input-readonly.component';

import { datasetFormPatchThunk } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

interface ExternalProps {
  dispatch: (arg: any) => void;
  catalogId: string;
  datasetId: string;
  isReadOnly: boolean;
  onInputChange: () => void;
  referenceTypesItems: any[];
  referenceDatasetsItems: any[];
  languages: any[];
}

interface Props extends ExternalProps, TranslationsProps {}

const renderReadOnly = ({
  input,
  referenceDatasetsItems,
  translationsService
}: any) => {
  const { referenceType } = input.value || {};
  const referenceTypeText = translationsService.translate(
    referenceType && referenceType.prefLabel
  );

  const uri = input.value && input.value.source && input.value.source.uri;

  const dataset = referenceDatasetsItems.find((i: any) => i.uri === uri);

  const datasetTitle = translationsService.translate(dataset?.title);

  return (
    <div className='pl-3'>
      {referenceTypeText} {datasetTitle}
    </div>
  );
};

const renderReferenceFields = ({
  item,
  index,
  fields,
  onDeleteFieldAtIndex,
  referenceTypesItems,
  referenceDatasetsItems,
  isReadOnly,
  onInputChange,
  translationsService
}: any) => (
  <div key={item}>
    {isReadOnly && (
      <Field
        name={`${item}`}
        component={renderReadOnly}
        referenceDatasetsItems={referenceDatasetsItems}
        translationsService={translationsService}
      />
    )}
    {!isReadOnly && (
      <div className='d-flex mb-2' key={index}>
        <div className='w-50'>
          <Field
            name={`${item}.referenceType`}
            component={SelectField}
            labelKey='label'
            items={referenceTypesItems}
            placeholder='Velg type'
          />
        </div>
        <div className='w-50'>
          <Field
            name={`${item}.source`}
            component={SelectField}
            items={referenceDatasetsItems.map(
              ({ uri, title, publisher }: any) => ({
                uri,
                prefLabel: {
                  [Language.NB]: `${translationsService.translate(
                    title
                  )} (Eier: ${
                    translationsService.translate(publisher?.prefLabel) ||
                    publisher?.name
                  })`
                }
              })
            )}
            onInputChange={onInputChange}
            placeholder='Søk på datasett'
          />
        </div>
        <div className='d-flex align-items-end'>
          <button
            className='fdk-btn-no-border'
            type='button'
            title='Remove reference'
            onClick={() => onDeleteFieldAtIndex(fields, index)}
          >
            <i className='fa fa-trash mr-2' />
          </button>
        </div>
      </div>
    )}
  </div>
);

const renderReference = ({
  fields,
  onDeleteFieldAtIndex,
  referenceTypesItems,
  referenceDatasetsItems,
  isReadOnly,
  onInputChange,
  translationsService
}: any) => (
  <div>
    {fields?.map((item: any, index: number) =>
      renderReferenceFields({
        item,
        index,
        fields,
        referenceTypesItems,
        referenceDatasetsItems,
        onDeleteFieldAtIndex,
        isReadOnly,
        onInputChange,
        translationsService
      })
    )}
    {!isReadOnly && (
      <button
        className='fdk-btn-no-border'
        type='button'
        onClick={() => fields.push({})}
      >
        <i className='fa fa-plus mr-2' />
        <Translation id='schema.reference.addReferenceLabel' />
      </button>
    )}
  </div>
);

const renderRelationFields = ({
  field,
  onDeleteFieldAtIndex,
  languages,
  isReadOnly
}: any) => (
  <div key={field}>
    {isReadOnly && (
      <div className='mb-4'>
        <MultilingualField
          name={`${field}.prefLabel`}
          component={InputFieldReadonly}
          languages={languages}
          label='Title'
          showLabel
        />
        <div className='mt-4'>
          <Field
            name={`${field}.uri`}
            component={InputFieldReadonly}
            label='Lenke'
            showLabel
          />
        </div>
      </div>
    )}
    {!isReadOnly && (
      <div className='mb-4' key={field}>
        <MultilingualField
          name={`${field}.prefLabel`}
          component={InputField}
          languages={languages}
          label='Title'
          showLabel
        />
        <div className='mt-4'>
          <Field
            name={`${field}.uri`}
            component={InputField}
            label='Lenke'
            showLabel
          />
        </div>
        <div className='d-flex align-items-end my-2 mb-4'>
          <button
            className='fdk-btn-no-border'
            type='button'
            title='Remove reference'
            onClick={onDeleteFieldAtIndex}
          >
            <i className='fa fa-trash mr-2' />
            <Translation id='schema.reference.removeRelationLabel' />
          </button>
        </div>
      </div>
    )}
  </div>
);

const renderRelations = ({
  fields,
  onDeleteFieldAtIndex,
  languages,
  isReadOnly
}: any) => (
  <div>
    {fields.map((field: any, index: number) =>
      renderRelationFields({
        field,
        languages,
        onDeleteFieldAtIndex: () => onDeleteFieldAtIndex(fields, index),
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
        <Translation id='schema.reference.addRelationLabel' />
      </button>
    )}
  </div>
);

const FormReference: FC<Props> = ({
  dispatch,
  catalogId,
  datasetId,
  languages,
  isReadOnly,
  onInputChange,
  referenceTypesItems,
  referenceDatasetsItems,
  translationsService
}) => {
  const deleteFieldAtIndex = (fields: any, index: number) => {
    const values = fields.getAll();
    // use splice instead of skip, for changing the bound value
    values.splice(index, 1);
    const patch = { [fields.name]: values };
    const thunk = datasetFormPatchThunk({ catalogId, datasetId, patch });
    dispatch(thunk);
  };

  return referenceTypesItems && referenceDatasetsItems ? (
    <form>
      <div className='form-group'>
        <Helptext
          title={translationsService.translate(
            'schema.reference.helptext.reference'
          )}
          term='Dataset_relation'
          recommended
        />
        <FieldArray
          name='references'
          component={renderReference}
          referenceTypesItems={referenceTypesItems}
          referenceDatasetsItems={referenceDatasetsItems}
          onDeleteFieldAtIndex={deleteFieldAtIndex}
          isReadOnly={isReadOnly}
          onInputChange={onInputChange}
          translationsService={translationsService}
        />
      </div>
      <div className='form-group'>
        <Helptext
          title={translationsService.translate(
            'schema.reference.helptext.relatedResources'
          )}
          term='Dataset_relation_resource'
          recommended
        />
        <FieldArray
          name='relations'
          component={renderRelations}
          languages={languages}
          onDeleteFieldAtIndex={deleteFieldAtIndex}
          isReadOnly={isReadOnly}
        />
      </div>
    </form>
  ) : null;
};

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(FormReference);
