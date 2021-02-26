import { all } from 'redux-saga/effects';

import enhetsregisteretSaga from '../components/with-enhetsregisteret/redux/saga';
import kartverketSaga from '../components/with-kartverket/redux/saga';
import datasetSaga from '../components/with-datasets/redux/saga';

export default function* saga() {
  yield all([enhetsregisteretSaga(), kartverketSaga(), datasetSaga()]);
}
