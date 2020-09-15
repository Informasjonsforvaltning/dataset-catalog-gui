import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import localization from '../../../services/localization';

import { Helptext } from '../../../components/helptext/helptext.component';
import ExternalInformationModels from './external-information-models/external-information-models.component';
import FdkInformationModels from './fdk-information-models/fdk-information-models.component';

export const FormInformationModelPure = ({
  languages,
  isReadOnly,
  dispatch,
  catalogId,
  datasetId
}) => (
  <form>
    <div className="form-group">
      <div className="mt-4">
        <div className="form-group">
          <Helptext
            title={
              localization.schema.informationModel.helptext.fdkInformationModel
            }
            term="Dataset_fdkInformationModel"
          />
          <FieldArray
            name="informationModel"
            component={FdkInformationModels}
            isReadOnly={isReadOnly}
            dispatch={dispatch}
            catalogId={catalogId}
            datasetId={datasetId}
          />
          <Helptext
            title={
              localization.schema.informationModel.helptext
                .externalInformationModel
            }
            term="Dataset_externalInformationModel"
          />
          <FieldArray
            name="informationModel"
            component={ExternalInformationModels}
            titleLabel={localization.schema.informationModel.titleLabel}
            linkLabel={localization.schema.informationModel.linkLabel}
            addLabel={localization.schema.informationModel.addLabel}
            languages={languages}
            isReadOnly={isReadOnly}
            dispatch={dispatch}
            catalogId={catalogId}
            datasetId={datasetId}
          />
        </div>
      </div>
    </div>
  </form>
);

FormInformationModelPure.defaultProps = {
  languages: [],
  isReadOnly: false,
  dispatch: null,
  catalogId: null,
  datasetId: null
};

FormInformationModelPure.propTypes = {
  languages: PropTypes.array,
  isReadOnly: PropTypes.bool,
  dispatch: PropTypes.func,
  catalogId: PropTypes.string,
  datasetId: PropTypes.string
};
