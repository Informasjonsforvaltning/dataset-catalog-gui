import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Field, WrappedFieldArrayProps } from 'redux-form';

import env from '../../../env';

import InputField from '../../fields/field-input/field-input.component';
import MultilingualField from '../../multilingual-field/multilingual-field.component';
import LinkReadonlyField from '../../fields/field-link-readonly/field-link-readonly.component';
import InputFieldReadonly from '../../fields/field-input-readonly/field-input-readonly.component';
import { datasetFormPatchThunk } from '../../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

import '../form-informationmodel.component.scss';

const { FDK_BASE_URI } = env;

interface ExternalProps {
  titleLabel: string;
  linkLabel: string;
  addLabel: string;
  languages: any[];
  isReadOnly: boolean;
  dispatch: (arg: any) => void;
  catalogId: string;
  datasetId: string;
}

interface Props extends ExternalProps, WrappedFieldArrayProps {}

const ExternalInformationModels: FC<Props> = ({
  fields,
  titleLabel,
  linkLabel,
  addLabel,
  languages,
  isReadOnly,
  dispatch,
  catalogId,
  datasetId
}) => {
  const patchInformationModels = (models: any) => {
    const patch = { [fields.name]: models };
    const thunk = datasetFormPatchThunk({ catalogId, datasetId, patch });
    dispatch(thunk);
  };

  const removeModelAtIndex = (index: any) => {
    const models = fields.getAll();
    models.splice(index, 1);
    patchInformationModels(fields.getAll());
  };

  const isFdkURI = (uri: any) =>
    !!uri?.includes(`${FDK_BASE_URI}/informationmodels/`);

  return (
    <div>
      {fields &&
        fields.map((item, index) => (
          <div
            key={`fdk-info-model-${item}`}
            className={
              isFdkURI(fields.get(index).uri) ? 'display-none' : 'd-flex mb-2'
            }
          >
            <div className='w-50'>
              <MultilingualField
                name={`${item}.prefLabel`}
                component={isReadOnly ? InputFieldReadonly : InputField}
                label={titleLabel}
                showLabel
                languages={languages}
              />
            </div>
            <div className='w-50'>
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
                  title='Remove reference'
                  onClick={() => removeModelAtIndex(index)}
                >
                  <i className='fa fa-trash mr-2' />
                </button>
              </div>
            )}
          </div>
        ))}
      {!isReadOnly && (
        <button
          className='fdk-btn-no-border'
          type='button'
          onClick={() => fields.push({})}
        >
          <i className='fa fa-plus mr-2' />
          {addLabel}
        </button>
      )}
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(ExternalInformationModels);
