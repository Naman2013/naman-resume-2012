import { all } from 'redux-saga/effects';
import leaderboardSaga from './modules/leaderboard/sagas';
import questsSaga from './modules/quests/sagas';
import purchaseConfirmationSaga from './modules/purchase-confirmation/sagas';
import accountSaga from './modules/account-settings/sagas';

export default function* rootSaga() {
  yield all([
    leaderboardSaga(),
    purchaseConfirmationSaga(),
    questsSaga(),
    accountSaga(),
  ]);
}
