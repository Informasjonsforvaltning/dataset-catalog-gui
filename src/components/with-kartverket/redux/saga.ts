import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  LIST_PLACES_REQUESTED,
  SEARCH_PLACES_REQUESTED
} from './actions-types';
import * as actions from './actions';

import type { KartverketPlace } from '../../../types';

function* listPlacesRequested({
  payload: { ids }
}: ReturnType<typeof actions.listPlacesRequested>) {
  try {
    const places = (yield all(
      [...new Set(ids)].map(id =>
        call(axios.get, 'https://ws.geonorge.no/SKWS3Index/ssr/json/sok', {
          params: { ssrId: id }
        })
      )
    ))
      .map(({ data }) => data?.stedsnavn)
      .filter(Boolean);

    if (Array.isArray(places)) {
      yield put(
        actions.listPlacesSucceeded(
          places.map(
            ({
              ssrId: id,
              navnetype: type,
              stedsnavn: name,
              kommunenavn: municipality,
              fylkesnavn: county
            }) => ({
              id,
              type,
              name,
              municipality,
              county
            })
          ) as KartverketPlace[]
        )
      );
    } else {
      yield put(
        actions.listPlacesFailed(
          new Error(
            'An error occurred during an attempt to contact Kartverket API'
          )
        )
      );
    }
  } catch (error) {
    yield put(actions.listPlacesFailed(error));
  }
}

function* searchPlacesRequested({
  payload: { name: searchName, size }
}: ReturnType<typeof actions.searchPlacesRequested>) {
  try {
    const { data: organizationsData } = yield call(
      axios.get,
      'https://ws.geonorge.no/SKWS3Index/ssr/json/sok',
      { params: { navn: `${searchName}*`, antPerSide: size } }
    );

    if (Array.isArray(organizationsData?.stedsnavn)) {
      yield put(
        actions.searchPlacesSucceeded(
          organizationsData?.stedsnavn.map(
            ({
              ssrId: id,
              navnetype: type,
              stedsnavn: name,
              kommunenavn: municipality,
              fylkesnavn: county
            }) => ({
              id,
              type,
              name,
              municipality,
              county
            })
          ) as KartverketPlace[]
        )
      );
    } else {
      yield put(
        actions.searchPlacesFailed(
          new Error(
            'An error occurred during an attempt to contact Kartverket API'
          )
        )
      );
    }
  } catch (error) {
    yield put(actions.searchPlacesFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(LIST_PLACES_REQUESTED, listPlacesRequested),
    takeLatest(SEARCH_PLACES_REQUESTED, searchPlacesRequested)
  ]);
}
