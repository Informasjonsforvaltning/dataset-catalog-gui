import { reduxForm } from 'redux-form';

import FormContactPoint from './form-contactPoint.component';
import validate from './form-contactPoint-validations';
import { asyncValidateDatasetInvokePatch } from '../../entrypoints/main/router/datasets/pages/dataset-page/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'contactPoint',
  validate,
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormTitle = reduxForm(config)(FormContactPoint);
