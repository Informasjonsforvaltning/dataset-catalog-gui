import { reduxForm } from 'redux-form';
import { asyncValidateDatasetInvokePatch } from '../../entrypoints/main/router/datasets/pages/dataset-page/formsLib/asyncValidateDatasetInvokePatch';

export const formPublishConfigurer = reduxForm({
  form: 'datasetPublish',
  asyncValidate: asyncValidateDatasetInvokePatch
});
