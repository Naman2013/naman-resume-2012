import { all } from 'redux-saga/effects';
import leaderboardSaga from './modules/leaderboard/sagas';

// import WatcherSaga from './Saga';
// import WatcherSaga2 from './Saga2';

export default function* rootSaga() {
  yield all([leaderboardSaga()]);
}
