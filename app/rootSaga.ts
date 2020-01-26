import { all } from 'redux-saga/effects';
import leaderboardSaga from './modules/leaderboard/sagas';
import questsSaga from './modules/quests/sagas';
import purchaseConfirmationSaga from './modules/purchase-confirmation/sagas';
import accountSaga from './modules/account-settings/sagas';
import showsSaga from './modules/shows/sagas';
import aboutSaga from './modules/about/sagas';

export default function* rootSaga() {
  yield all([
    leaderboardSaga(),
    purchaseConfirmationSaga(),
    questsSaga(),
    accountSaga(),
    showsSaga(),
    aboutSaga(),
  ]);
}
