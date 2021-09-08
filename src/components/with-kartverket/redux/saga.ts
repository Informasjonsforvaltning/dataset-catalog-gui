import { all, call, put, takeLatest } from 'redux-saga/effects';

import { SEARCH_ADMINISTRATIVE_UNITS_REQUESTED } from './actions-types';
import * as actions from './actions';

import { searchAdministrativeUnits } from './utils';

import type { AdministrativeUnit } from '../../../types';

function* searchAdministrativeUnitsRequested({
  payload: { name: search, size }
}: ReturnType<typeof actions.searchAdministrativeUnitsRequested>) {
  try {
    const administrativeUnits: AdministrativeUnit[] = yield call(
      searchAdministrativeUnits,
      search,
      size
    );

    if (Array.isArray(administrativeUnits)) {
      yield put(
        actions.searchAdministrativeUnitsSucceeded(administrativeUnits)
      );
    } else {
      yield put(
        actions.searchAdministrativeUnitsFailed(
          new Error(
            'An error occurred during an attempt to contact Kartverket API'
          )
        )
      );
    }
  } catch (error: any) {
    yield put(actions.searchAdministrativeUnitsFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(
      SEARCH_ADMINISTRATIVE_UNITS_REQUESTED,
      searchAdministrativeUnitsRequested
    )
  ]);
}
