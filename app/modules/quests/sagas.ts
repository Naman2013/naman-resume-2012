import { takeLatest, select, call, put } from 'redux-saga/effects';
import { getImageorderingModuleApi } from 'app/modules/quests/api';
import { TYPE, ACTION } from './reducer';

export default function* watchFetchImageorderingModule() {
  yield takeLatest(TYPE.GET_IMAGEORDERING_MODULE, fetchImageorderingModule);
}

export function* fetchImageorderingModule(action: any) {
  try {
    const { at, token, cid } = yield select(state => state.user);
    const payload = { at, token, cid };
    const resp = yield call(getImageorderingModuleApi, {
      payload,
      ...action.data,
    });
    yield put(ACTION.getImageorderingModuleSuccess(resp.data));
  } catch (error) {
    yield put(ACTION.getImageorderingModuleError(error));
  }
}
