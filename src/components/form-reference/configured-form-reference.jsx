import { reduxForm } from 'redux-form';

import FormReference from './form-reference.component';
import validate from './form-reference-validations';
import { asyncValidateDatasetInvokePatch } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'reference',
  validate,
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormReference = reduxForm(config)(FormReference);
