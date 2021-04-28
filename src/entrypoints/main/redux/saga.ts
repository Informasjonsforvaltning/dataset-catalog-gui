import { all } from 'redux-saga/effects';

import enhetsregisteretSaga from '../../../components/with-enhetsregisteret/redux/saga';
import kartverketSaga from '../../../components/with-kartverket/redux/saga';
import catalogSaga from '../../../components/with-catalog/redux/saga';
import catalogsSaga from '../../../components/with-catalogs/redux/saga';
import datasetsSaga from '../../../components/with-datasets/redux/saga';
import datasetSaga from '../../../components/with-dataset/redux/saga';
import organizationSaga from '../../../components/with-organization/redux/saga';
import referenceDataSaga from '../../../components/with-reference-data/redux/saga';

export default function* saga() {
  yield all([
    enhetsregisteretSaga(),
    kartverketSaga(),
    catalogSaga(),
    catalogsSaga(),
    datasetsSaga(),
    datasetSaga(),
    organizationSaga(),
    referenceDataSaga()
  ]);
}
