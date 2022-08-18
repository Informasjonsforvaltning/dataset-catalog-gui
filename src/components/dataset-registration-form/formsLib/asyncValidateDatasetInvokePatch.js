import { compare } from 'fast-json-patch';

import {
  datasetFormPatchErrorAction,
  datasetFormPatchIsSavingAction,
  datasetFormPatchSuccessAction
} from '../../../entrypoints/main/redux/modules/dataset-form-status';
import { datasetSuccessAction } from '../../../entrypoints/main/redux/modules/datasets';
import { patchDataset } from '../../../services/api/registration-api/datasets';
import { patchDatasetSucceeded } from '../../with-dataset/redux/actions';

export const datasetFormPatchThunk =
  ({ catalogId, datasetId, datasetItem, patch }) =>
  dispatch => {
    if (!(catalogId && datasetId)) {
      throw new Error('catalogId and datasetId required');
    }

    const operations = compare(datasetItem, { ...datasetItem, ...patch });
    dispatch(datasetFormPatchIsSavingAction({ datasetId }));

    return patchDataset(catalogId, datasetId, operations)
      .then(dataset => {
        dispatch(datasetFormPatchSuccessAction({ datasetId, patch }));
        dispatch(datasetSuccessAction(dataset));
        dispatch(patchDatasetSucceeded(dataset));
      })
      .catch(error =>
        dispatch(
          datasetFormPatchErrorAction({
            datasetId,
            error
          })
        )
      );
  };

export const asyncValidateDatasetInvokePatch = (values, dispatch, props) => {
  const { catalogId, datasetId, datasetItem = {} } = props;

  return dispatch(
    datasetFormPatchThunk({ catalogId, datasetId, datasetItem, patch: values })
  ).catch(() => {}); // handle rejects because form validation api expects certain format of rejects
};
