import { connect } from 'react-redux';

import { ConfiguredFormQualifiedAttributions } from './configured-form-qualified-attributions';

const mapStateToProps = (_: any, { datasetItem = {} }: any) => ({
  initialValues: {
    qualifiedAttributions: datasetItem.qualifiedAttributions || []
  }
});

export const ConnectedFormQualifiedAttributions = connect(mapStateToProps)(
  ConfiguredFormQualifiedAttributions
);
