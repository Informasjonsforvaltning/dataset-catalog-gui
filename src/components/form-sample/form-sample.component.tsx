import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field, FieldArray } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../providers/translations';

import Translation from '../translation';
import Helptext from '../helptext/helptext.component';
import InputField from '../fields/field-input/field-input.component';
import MultilingualField from '../multilingual-field/multilingual-field.component';
import InputTagsField from '../fields/field-input-tags/field-input-tags.component';
import TextAreaField from '../fields/field-textarea/field-textarea.component';
import { licenseType, textType } from '../../schemaTypes';
import { datasetFormPatchThunk } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';
import LinkReadonlyField from '../fields/field-link-readonly/field-link-readonly.component';
import InputFieldReadonly from '../fields/field-input-readonly/field-input-readonly.component';

interface ExternalProps {
  dispatch: (arg: any) => void;
  catalogId: string;
  datasetId: string;
  languages: any[];
  isReadOnly: boolean;
}

interface Props extends ExternalProps, TranslationsProps {}

const renderFormatReadOnly = ({ input }: any) => (
  <div>{input.value.join(', ')}</div>
);

const renderSamples = ({
  fields,
  onDeleteFieldAtIndex,
  languages,
  isReadOnly,
  translationsService
}: any) => (
  <div>
    {fields?.map((sample: any, index: number) => (
      <div key={index}>
        {!isReadOnly && (
          <div className='d-flex'>
            <button
              className='fdk-btn-no-border'
              type='button'
              title={translationsService.translate(
                'schema.sample.removeSample'
              )}
              onClick={() => onDeleteFieldAtIndex(fields, index)}
            >
              <i className='fa fa-trash mr-2' />
              <Translation id='schema.sample.deleteSampleLabel' />
            </button>
          </div>
        )}
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.sample.helptext.downloadURL'
            )}
          />
          <Field
            name={`${sample}.downloadURL.0`}
            type='text'
            component={isReadOnly ? LinkReadonlyField : InputField}
            label={translationsService.translate(
              'schema.sample.downloadURLLabel'
            )}
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.sample.helptext.accessURL'
            )}
          />
          <Field
            name={`${sample}.accessURL.0`}
            type='text'
            component={isReadOnly ? LinkReadonlyField : InputField}
            label={translationsService.translate(
              'schema.sample.accessURLLabel'
            )}
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.sample.helptext.format'
            )}
            term='Distribution_format'
          />
          <Field
            name={`${sample}.format`}
            type='text'
            component={isReadOnly ? renderFormatReadOnly : InputTagsField}
            label={translationsService.translate('schema.sample.formatLabel')}
          />
        </div>
        <div className='form-group mb-0'>
          <Helptext
            title={translationsService.translate(
              'schema.sample.helptext.description'
            )}
          />
          <MultilingualField
            name={`${sample}.description`}
            component={isReadOnly ? InputFieldReadonly : TextAreaField}
            label={translationsService.translate(
              'schema.sample.descriptionLabel'
            )}
            languages={languages}
          />
        </div>
      </div>
    ))}
    {fields && fields.length === 0 && (
      <button
        className='fdk-btn-no-border'
        type='button'
        onClick={() =>
          fields.push({
            id: '',
            description: textType,
            accessURL: [],
            license: licenseType,
            conformsTo: [],
            page: [licenseType],
            format: [],
            type: ''
          })
        }
      >
        <i className='fa fa-plus mr-2' />
        <Translation id='schema.sample.addSampleLabel' />
      </button>
    )}
  </div>
);

const FormSample: FC<Props> = ({
  dispatch,
  catalogId,
  datasetId,
  languages,
  isReadOnly,
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

  return (
    <form>
      <FieldArray
        name='sample'
        component={renderSamples}
        onDeleteFieldAtIndex={deleteFieldAtIndex}
        languages={languages}
        isReadOnly={isReadOnly}
        translationsService={translationsService}
      />
    </form>
  );
};

export default compose<FC<ExternalProps>>(memo, withTranslations)(FormSample);
