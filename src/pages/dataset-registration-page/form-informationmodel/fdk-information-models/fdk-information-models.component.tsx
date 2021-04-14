import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldArrayProps } from 'redux-form';

import env from '../../../../env';

import { datasetFormPatchThunk } from '../../formsLib/asyncValidateDatasetInvokePatch';

import Translation from '../../../../components/translation';

import FdkInformationModelsSuggestionField from './fdk-information-models-suggestion-field.component';

import { insertTestId } from '../../../../../test/utils/testUtils';

import '../form-informationmodel.component.scss';

const { FDK_BASE_URI } = env;

export const TestIds = {
  component: 'dataset-fdk-information-models',
  pill: 'dataset-fdk-information-models-pill'
};

interface ExternalProps {
  isReadOnly: boolean;
  dispatch: (arg: any) => void;
  catalogId: string;
  datasetId: string;
}

interface Props extends ExternalProps, WrappedFieldArrayProps {}

const FdkInformationModels: FC<Props> = ({
  fields,
  isReadOnly,
  dispatch,
  catalogId,
  datasetId
}) => {
  const patchInformationModels = (models: any) => {
    const patch = { [fields.name]: models };
    const thunk = datasetFormPatchThunk({ catalogId, datasetId, patch });
    dispatch(thunk);
  };

  const removeModelAtIndex = (index: any) => {
    const models = fields.getAll();
    models.splice(index, 1);
    patchInformationModels(models);
  };

  const addModel = (model: any) => {
    const models = fields.getAll();
    models.push(model);
    patchInformationModels(models);
  };

  const isFdkURI = (uri: any) =>
    uri && uri.includes(`${FDK_BASE_URI}/informationmodels/`);

  return (
    <div className='fdk-info-models' {...insertTestId(TestIds.component)}>
      {!isReadOnly && (
        <FdkInformationModelsSuggestionField addInformationModel={addModel} />
      )}
      {fields &&
        fields.map((item, index) => (
          <div
            key={`external-info-model-${item}`}
            className={
              isFdkURI(fields.get(index).uri)
                ? 'fdk-info-model-pill'
                : 'display-none'
            }
            {...insertTestId(TestIds.pill)}
          >
            <span className='fdk-info-model-pill-label'>
              <Translation object={fields.get(index).prefLabel} />
            </span>
            {!isReadOnly && (
              <i
                className='fa fa-times mr-2 remove-fdk-info-model'
                role='button'
                tabIndex={0}
                onClick={() => removeModelAtIndex(index)}
                onKeyPress={e => {
                  removeModelAtIndex(index);
                  e.preventDefault();
                }}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default compose<FC<ExternalProps>>(memo)(FdkInformationModels);
