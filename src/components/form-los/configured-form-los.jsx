import { reduxForm } from 'redux-form';

import FormLOS from './form-los.component';
import { asyncValidateDatasetInvokePatch } from '../../pages/dataset-registration-page/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'themes',
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormLOS = reduxForm(config)(FormLOS);
