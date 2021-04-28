import _ from 'lodash';
import { reduxForm } from 'redux-form';

import { FormQualifiedAttributions } from './form-qualified-attributions.component';
import { asyncValidateDatasetInvokePatch } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

const config = {
  form: 'qualifiedAttributions',
  shouldAsyncValidate: _.stubTrue, // override default, save even if sync validation fails
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormQualifiedAttributions = reduxForm(config)(
  FormQualifiedAttributions
);
