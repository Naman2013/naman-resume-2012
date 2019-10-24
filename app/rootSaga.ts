import { all } from 'redux-saga/effects';
import leaderboardSaga from './modules/leaderboard/sagas';

export default function* rootSaga() {
  yield all([leaderboardSaga()]);
}
