import { all } from 'redux-saga/effects';

import enhetsregisteretSaga from '../components/with-enhetsregisteret/redux/saga';

export default function* saga() {
  yield all([enhetsregisteretSaga()]);
}
