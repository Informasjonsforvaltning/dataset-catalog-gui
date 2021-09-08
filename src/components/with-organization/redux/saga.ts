import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import { GET_ORGANIZATION_REQUESTED } from './action-types';
import * as actions from './actions';

import type { Publisher } from '../../../types';

const { ORGANIZATION_API_HOST } = env;

function* getOrganizationRequested({
  payload: { id }
}: ReturnType<typeof actions.getOrganizationRequested>) {
  try {
    const { data } = yield call(
      axios.get,
      `${ORGANIZATION_API_HOST}/organizations/${id}`,
      { headers: { accept: 'application/json' } }
    );

    if (data) {
      yield put(actions.getOrganizationSucceeded(data as Publisher));
    } else {
      yield put(actions.getOrganizationFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getOrganizationFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_ORGANIZATION_REQUESTED, getOrganizationRequested)]);
}
