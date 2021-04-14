import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field, FieldArray } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import Translation from '../../../components/translation';
import Helptext from '../../../components/helptext/helptext.component';
import SelectField from '../../../components/fields/field-select/field-select.component';
import MultilingualField from '../../../components/multilingual-field/multilingual-field.component';
import InputField from '../../../components/fields/field-input/field-input.component';
import InputFieldReadonly from '../../../components/fields/field-input-readonly/field-input-readonly.component';

import { datasetFormPatchThunk } from '../formsLib/asyncValidateDatasetInvokePatch';

interface ExternalProps {
  initialValues: any;
  dispatch: (arg: any) => void;
  catalogId: string;
  datasetId: string;
  isReadOnly: boolean;
  onInputChange: () => void;
  languages: any[];
}

interface Props extends ExternalProps, TranslationsProps {}

const FormReference: FC<Props> = ({
  initialValues: { referenceTypesItems, referenceDatasetsItems },
  dispatch,
  catalogId,
  datasetId,
  languages,
  isReadOnly,
  onInputChange,
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

  const renderReadOnly = ({ input }: any) => {
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
    onDeleteFieldAtIndex
  }: any) => (
    <div key={item}>
      {isReadOnly && (
        <Field
          name={`${item}`}
          component={renderReadOnly}
          referenceDatasetsItems={referenceDatasetsItems}
        />
      )}
      {!isReadOnly && (
        <div className='d-flex mb-2' key={index}>
          <div className='w-50'>
            <Field
              name={`${item}.referenceType`}
              component={SelectField}
              items={referenceTypesItems}
            />
          </div>
          <div className='w-50'>
            <Field
              name={`${item}.source`}
              component={SelectField}
              items={referenceDatasetsItems}
              labelKey='title'
              onInputChange={onInputChange}
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

  const renderRelationFields = ({ field, onDeleteFieldAtIndex }: any) => (
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

  const renderReference = ({ fields, onDeleteFieldAtIndex }: any) => (
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
          onInputChange
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

  const renderRelations = ({ fields, onDeleteFieldAtIndex }: any) => (
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
