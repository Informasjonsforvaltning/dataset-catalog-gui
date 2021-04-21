import { reduxForm } from 'redux-form';

import FormContentsComponent from './form-contents.component';
import validate from './form-contents-validations';
import { asyncValidateDatasetInvokePatch } from '../../pages/dataset-registration-page/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'contents',
  validate,
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormTitle = reduxForm(config)(FormContentsComponent);
