import { takeLatest, select, call, put } from 'redux-saga/effects';
import { getLeaderboardApi } from 'app/modules/leaderboard/api';
import { TYPES, ACTIONS } from './reducer';

export default function* watchTypeToListenFor() {
  console.log('watchTypeToListenFor');
  yield takeLatest(TYPES.GET_LEADERBOARD, workerSaga);
}

export function* workerSaga(action: any) {
  console.log('workerSaga');
  try {
    const { at, token, cid } = yield select(state => state.user);
    // const { things, from, action } = action.data;
    const payload = { at, token, cid };
    const data = yield call(getLeaderboardApi, payload);
    yield put(ACTIONS.getLeaderboardSuccess(data));
  } catch (error) {
    yield put(ACTIONS.getLeaderboardError(error));
  }
}
