import { reduxForm } from 'redux-form';
import _throttle from 'lodash/throttle';

import FormAccessRights from './form-accessRights.component';
import validate from './form-accessRights.validations';
import { asyncValidateDatasetInvokePatch } from '../../entrypoints/main/router/datasets/pages/dataset-page/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'accessRights',
  validate,
  asyncValidate: _throttle(asyncValidateDatasetInvokePatch, 250)
};

export const ConfiguredFormAccessRights = reduxForm(config)(FormAccessRights);
