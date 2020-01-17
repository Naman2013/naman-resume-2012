import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getUpcomingShowsApi,
  getHighlightedShowsApi,
} from 'app/modules/shows/api';
import { TYPE, ACTION } from './reducer';

export default function* watchFetchDashboardShows() {
  yield takeLatest(TYPE.GET_DASHBOARD_SHOWS, fetchDashboardShows);
}

export function* fetchDashboardShows(action: any) {
  const {
    payload: { upcomingShowsParams, highlightedShowsParams },
  } = action;

  try {
    const upcomingShowsResp = yield call(
      getUpcomingShowsApi,
      upcomingShowsParams
    );
    const highlightedShowsResp = yield call(
      getHighlightedShowsApi,
      highlightedShowsParams
    );

    const showsList = [
      ...upcomingShowsResp.data.eventList,
      ...highlightedShowsResp.data.eventList,
    ];

    yield put(ACTION.getDashboardShowsSuccess(showsList));
  } catch (error) {
    yield put(ACTION.getDashboardShowsError(error));
  }
}
