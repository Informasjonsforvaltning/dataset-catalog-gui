import { reduxForm } from 'redux-form';

import FormReference from './form-reference.component';
import validate from './form-reference-validations';
import { asyncValidateDatasetInvokePatch } from '../../pages/dataset-registration-page/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'reference',
  validate,
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormTitle = reduxForm(config)(FormReference);
