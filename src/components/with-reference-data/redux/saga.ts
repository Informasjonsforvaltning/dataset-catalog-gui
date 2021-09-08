import axios, { AxiosResponse } from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import env from '../../../env';

import { GET_REFERENCE_DATA_REQUESTED } from './action-types';
import * as actions from './actions';

import type { ReferenceData } from '../../../types';
import { ReferenceDataCode } from '../../../types/enums';

const { FDK_BASE_URI } = env;

function* getReferenceDataRequested({
  payload: { codes }
}: ReturnType<typeof actions.getReferenceDataRequested>) {
  try {
    const data: Record<ReferenceDataCode, AxiosResponse> = yield all(
      codes.reduce(
        (previous, current) => ({
          ...previous,
          [current]: call(
            axios.get,
            `${FDK_BASE_URI}/reference-data/${current}`
          )
        }),
        {}
      )
    );

    const referenceData = Object.entries(data).reduce(
      (previous, [key, value]) => ({ ...previous, [key]: value.data }),
      {} as ReferenceData
    );

    if (Object.values(referenceData).length > 0) {
      yield put(actions.getReferenceDataSucceeded(referenceData));
    } else {
      yield put(actions.getReferenceDataFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getReferenceDataFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeEvery(GET_REFERENCE_DATA_REQUESTED, getReferenceDataRequested)
  ]);
}
