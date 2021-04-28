import { reduxForm } from 'redux-form';

import FormReference from './form-reference.component';
import validate from './form-reference-validations';
import { asyncValidateDatasetInvokePatch } from '../../entrypoints/main/router/datasets/pages/dataset-page/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'reference',
  validate,
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormReference = reduxForm(config)(FormReference);
