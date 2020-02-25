import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import InputField from '../../../../components/fields/field-input/field-input.component';
import MultilingualField from '../../../../components/multilingual-field/multilingual-field.component';
import LinkReadonlyField from '../../../../components/fields/field-link-readonly/field-link-readonly.component';
import InputFieldReadonly from '../../../../components/fields/field-input-readonly/field-input-readonly.component';
import { datasetFormPatchThunk } from '../../formsLib/asyncValidateDatasetInvokePatch';
import { getConfig } from '../../../../config';

import '../form-informationmodel.component.scss';

const ExternalInformationModels = ({
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
  const onDeleteFieldAtIndex = (fields, index) => {
    const values = fields.getAll();
    // use splice instead of skip, for changing the bound value
    values.splice(index, 1);
    const patch = { [fields.name]: values };
    const thunk = datasetFormPatchThunk({ catalogId, datasetId, patch });
    dispatch(thunk);
  };

  const isFdkURI = (uri) => uri && uri.includes(`${getConfig().searchHost}/informationmodels/`);

  return (
  <div>
    {fields &&
      fields.map((item, index) => (
        <div key={index} className={isFdkURI(fields.get(index).uri) ? "display-none" : "d-flex mb-2"} >
            <div className="w-50">
              <MultilingualField
                name={`${item}.prefLabel`}
                component={isReadOnly ? InputFieldReadonly : InputField}
                label={titleLabel}
                showLabel
                languages={languages}
              />
            </div>
            <div className="w-50">
              <Field
                name={`${item}.uri`}
                component={isReadOnly ? LinkReadonlyField : InputField}
                label={linkLabel}
                showLabel
              />
            </div>
            {!isReadOnly &&
              <div className="d-flex align-items-end">
                <button
                  className="fdk-btn-no-border"
                  type="button"
                  title="Remove reference"
                  onClick={() => onDeleteFieldAtIndex(fields, index)}
                >
                  <i className="fa fa-trash mr-2" />
                </button>
              </div>
            }
          </div>
      ))
    }
    {!isReadOnly && (
        <button
          className="fdk-btn-no-border"
          type="button"
          onClick={() => fields.push({})}
        >
          <i className="fa fa-plus mr-2" />
          {addLabel}
        </button>
      )}
    </div>
  )
}

ExternalInformationModels.defaultProps = {
  fields: null,
  titleLabel: '',
  linkLabel: '',
  addLabel: '',
  languages: [],
  isReadOnly: false,
  dispatch: null,
  catalogId: null,
  datasetId: null
};

ExternalInformationModels.propTypes = {
  fields: PropTypes.object,
  titleLabel: PropTypes.string,
  linkLabel: PropTypes.string,
  addLabel: PropTypes.string,
  languages: PropTypes.array,
  isReadOnly: PropTypes.bool,
  dispatch: PropTypes.func,
  catalogId: PropTypes.string,
  datasetId: PropTypes.string
};

export default ExternalInformationModels;
