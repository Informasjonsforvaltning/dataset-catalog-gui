import { reduxForm } from 'redux-form';
import { asyncValidateDatasetInvokePatch } from '../dataset-registration-form/formsLib/asyncValidateDatasetInvokePatch';

export const formPublishConfigurer = reduxForm({
  form: 'datasetPublish',
  asyncValidate: asyncValidateDatasetInvokePatch
});
