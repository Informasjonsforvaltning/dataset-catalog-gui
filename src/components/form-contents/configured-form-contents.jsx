import { reduxForm } from 'redux-form';

import FormContentsComponent from './form-contents.component';
import validate from './form-contents-validations';
import { asyncValidateDatasetInvokePatch } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'contents',
  validate,
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormContents = reduxForm(config)(FormContentsComponent);
