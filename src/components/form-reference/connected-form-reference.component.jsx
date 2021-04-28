import { getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';

import { ConfiguredFormReference } from './configured-form-reference';
import { languageType } from '../../schemaTypes';

const mapStateToProps = (
  state,
  {
    datasetItem: {
      references = [languageType],
      relations = [{ uri: '', prefLabel: {} }]
    },
    referenceTypesItems,
    referenceDatasetsItems
  }
) => ({
  initialValues: {
    references,
    referenceTypesItems,
    referenceDatasetsItems,
    relations
  },
  syncErrors: getFormSyncErrors('reference')(state)
});

export const ConnectedFormReference = connect(mapStateToProps)(
  ConfiguredFormReference
);
