import React from 'react';
import PropTypes from 'prop-types';
import { getTranslateText } from '../../../../services/translateText';
import { datasetFormPatchThunk } from '../../formsLib/asyncValidateDatasetInvokePatch';
import { getConfig } from '../../../../config';
import FdkInformationModelsSuggestionField from './fdk-information-models-suggestion-field.component';
import { insertTestId } from '../../../../../test/utils/testUtils';

import '../form-informationmodel.component.scss';

export const TestIds = {
  component: 'dataset-fdk-information-models',
  pill: 'dataset-fdk-information-models-pill',
};

const FdkInformationModels = ({
  fields,
  isReadOnly,
  dispatch,
  catalogId,
  datasetId
}) => {

  const patchInformationModels = (models) => {
    const patch = { [fields.name]: models };
    const thunk = datasetFormPatchThunk({ catalogId, datasetId, patch });
    dispatch(thunk);
  };

  const removeModelAtIndex = (index) => {
    const models = fields.getAll();
    models.splice(index, 1);
    patchInformationModels(models);
  };

  const addModel = (model) => {
    const models = fields.getAll();
    models.push(model);
    patchInformationModels(models);
  };

  const isFdkURI = (uri) => uri && uri.includes(`${getConfig().searchHost}/informationmodels/`);

  return (
    <div className="fdk-info-models" {...insertTestId(TestIds.component)} >
      {!isReadOnly &&
        <FdkInformationModelsSuggestionField addInformationModel={addModel} />
      }
      {fields &&
        fields.map((item, index) => (
          <div 
            key={`external-info-model-${item}`}
            className={isFdkURI(fields.get(index).uri) ? "fdk-info-model-pill" : "display-none"}
            {...insertTestId(TestIds.pill)}
          >
            <span className="fdk-info-model-pill-label">{getTranslateText(fields.get(index).prefLabel)}</span>
            {!isReadOnly &&
              <i
                className="fa fa-times mr-2 remove-fdk-info-model"
                role="button"
                tabIndex="0"
                onClick={() => removeModelAtIndex(index) }
                onKeyPress={e => {
                  removeModelAtIndex(index);
                  e.preventDefault();
                }}
              />
            }
          </div>
        ))
      }
    </div>
  );

}

FdkInformationModels.defaultProps = {
  fields: null,
  isReadOnly: false,
  dispatch: null,
  catalogId: null,
  datasetId: null,
};

FdkInformationModels.propTypes = {
  fields: PropTypes.object,
  isReadOnly: PropTypes.bool,
  dispatch: PropTypes.func,
  catalogId: PropTypes.string,
  datasetId: PropTypes.string
};

export default FdkInformationModels;
