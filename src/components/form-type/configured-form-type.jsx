import { reduxForm } from 'redux-form';

import FormType from './form-type.component';
import { asyncValidateDatasetInvokePatch } from '../../entrypoints/main/router/datasets/pages/dataset-page/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'type',
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormType = reduxForm(config)(FormType);
