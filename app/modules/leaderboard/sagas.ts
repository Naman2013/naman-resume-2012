import { takeLatest, select, call, put } from 'redux-saga/effects';
import { getLeaderboardApi } from 'app/modules/leaderboard/api';
import { TYPES, ACTIONS } from './reducer';

export default function* watchTypeToListenFor() {
  yield takeLatest(TYPES.GET_LEADERBOARD, workerSaga);
}

export function* workerSaga(action: any) {
  try {
    const { at, token, cid } = yield select(state => state.user);
    // const { things, from, action } = action.data;
    const payload = { at, token, cid };
    const resp = yield call(getLeaderboardApi, payload);
    yield put(ACTIONS.getLeaderboardSuccess(resp.data));
  } catch (error) {
    yield put(ACTIONS.getLeaderboardError(error));
  }
}
