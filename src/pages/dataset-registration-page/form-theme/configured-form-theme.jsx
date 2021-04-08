import { reduxForm } from 'redux-form';

import { FormThemes } from './form-theme.component';
import { asyncValidateDatasetInvokePatch } from '../formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'themes',
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormThemes = reduxForm(config)(FormThemes);
