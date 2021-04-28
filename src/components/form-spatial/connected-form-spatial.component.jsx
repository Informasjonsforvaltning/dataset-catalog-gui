import { connect } from 'react-redux';
import moment from 'moment';

import { ConfiguredFormSpatial } from './configured-form-spatial';

const formatTemporalUnixDatesToISO = values => {
  let temporals = null;
  if (values && values.length > 0) {
    temporals = values.map(item => ({
      startDate: item?.startDate
        ? moment(item?.startDate).format('YYYY-MM-DD')
        : null,
      endDate: item?.endDate ? moment(item?.endDate).format('YYYY-MM-DD') : null
    }));
  }
  return temporals;
};

const mapStateToProps = (state, { datasetItem }) => ({
  initialValues: {
    spatial:
      (datasetItem?.spatial ?? []).length > 0 ? datasetItem?.spatial : [],
    temporal: formatTemporalUnixDatesToISO(datasetItem?.temporal) || [{}],
    issued: datasetItem?.issued
      ? moment(datasetItem?.issued).format('YYYY-MM-DD')
      : null,
    language:
      (datasetItem?.language ?? []).length > 0 ? datasetItem?.language : []
  }
});

export const ConnectedFormSpatial = connect(mapStateToProps)(
  ConfiguredFormSpatial
);
