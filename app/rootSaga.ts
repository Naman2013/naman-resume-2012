import { all } from 'redux-saga/effects';
import leaderboardSaga from './modules/leaderboard/sagas';
import purchaseConfirmationSaga from './modules/purchase-confirmation/sagas';

export default function* rootSaga() {
  yield all([leaderboardSaga(), purchaseConfirmationSaga()]);
}
