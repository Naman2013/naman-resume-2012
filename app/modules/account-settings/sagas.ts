import { takeLatest, select, call, put } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import {
  getAccountPreferencesApi,
  setAccountPreferenceApi,
} from 'app/modules/account-settings/api';
import { TYPE, ACTION } from './reducer';

export default function* watchAccountPreferences(): SagaIterator {
  yield takeLatest(TYPE.GET_ACCOUNT_PREFERENCES, getAccountPreferences);
  yield takeLatest(TYPE.SET_ACCOUNT_PREFERENCE, setAccountPreference);
}

export function* getAccountPreferences(action: any): SagaIterator {
  try {
    const { at, token, cid } = yield select(state => state.user);
    const payload = { at, token, cid, ...action.payload };
    const resp = yield call(getAccountPreferencesApi, payload);
    yield put(ACTION.getAccountPreferencesSuccess(resp.data));
  } catch (error) {
    yield put(ACTION.getAccountPreferencesError(error));
  }
}

export function* setAccountPreference(action: any): SagaIterator {
  try {
    const { at, token, cid } = yield select(state => state.user);
    const payload = { at, token, cid, ...action.payload };
    yield call(setAccountPreferenceApi, payload);
    yield put(ACTION.setAccountPreferenceSuccess());
    yield put(ACTION.getAccountPreferences());
  } catch (error) {
    yield put(ACTION.setAccountPreferenceError(error));
  }
}
