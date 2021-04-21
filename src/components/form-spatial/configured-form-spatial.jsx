import { reduxForm } from 'redux-form';

import FormSpatial from './form-spatial.component';
import validate from './form-spatial-validations';
import { asyncValidateDatasetInvokePatch } from '../../pages/dataset-registration-page/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'spatial',
  validate,
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormSpatial = reduxForm(config)(FormSpatial);
