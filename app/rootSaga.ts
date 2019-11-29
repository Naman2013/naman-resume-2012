import { all } from 'redux-saga/effects';
import leaderboardSaga from './modules/leaderboard/sagas';
import questsSaga from './modules/quests/sagas';

export default function* rootSaga() {
  yield all([leaderboardSaga(), questsSaga()]);
}
