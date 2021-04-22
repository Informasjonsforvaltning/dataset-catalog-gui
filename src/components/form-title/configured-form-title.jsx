import _ from 'lodash';
import { reduxForm } from 'redux-form';

import FormTitle from './form-title.component';
import { schema } from './form-title.validations';
import { asyncValidateDatasetInvokePatch } from '../../entrypoints/main/router/datasets/pages/dataset-page/formsLib/asyncValidateDatasetInvokePatch';
import { yupValidation } from '../../lib/yupValidation';

const config = {
  form: 'title',
  validate: values => yupValidation(schema, values),
  shouldAsyncValidate: _.stubTrue, // override default, save even if sync validation fails
  asyncValidate: asyncValidateDatasetInvokePatch
};

export const ConfiguredFormTitle = reduxForm(config)(FormTitle);
