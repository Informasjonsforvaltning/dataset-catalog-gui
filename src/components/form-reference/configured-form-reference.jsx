import { reduxForm } from 'redux-form';

import { yupValidation } from '../../lib/yupValidation';

import FormReference from './form-reference.component';
import schema from './form-reference-validations';
import { asyncValidateDatasetInvokePatch } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'reference',
  validate: values => yupValidation(schema, values),
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormReference = reduxForm(config)(FormReference);
