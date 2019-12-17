import { takeLatest, select, call, put } from 'redux-saga/effects';
import { getPurchaseConfirmationApi } from 'app/modules/purchase-confirmation/api';
import { TYPE, ACTION } from './reducer.ts';

export default function* watchGetPurchaseConfirmation() {
  yield takeLatest(TYPE.GET_PURCHASE_CONFIRMATION, getPurchaseConfirmation);
}

export function* getPurchaseConfirmation() {
  try {
    const { at, token, cid } = yield select(state => state.user);
    const payload = { at, token, cid };
    const resp = yield call(getPurchaseConfirmationApi, payload);
    yield put(ACTION.getPurchaseConfirmationSuccess(resp.data));
  } catch (error) {
    yield put(ACTION.getPurchaseConfirmationError(error));
  }
}
