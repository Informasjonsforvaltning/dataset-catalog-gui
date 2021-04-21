import { reduxForm } from 'redux-form';
import { asyncValidateDatasetInvokePatch } from '../../pages/dataset-registration-page/formsLib/asyncValidateDatasetInvokePatch';

export const formPublishConfigurer = reduxForm({
  form: 'datasetPublish',
  asyncValidate: asyncValidateDatasetInvokePatch
});
