import createReducer from '../utils/createReducer';
import {
  FETCH_LIVE_SHOW_INFO_START,
  FETCH_LIVE_SHOW_INFO_SUCCESS,
  FETCH_LIVE_SHOW_INFO_FAIL,
} from './live-shows-actions';

const initialState = {
  fetchingLiveShows: false,
  failedLiveShows: false,
  liveShowsResponse: {
    additionalFeeds: [],
    apiError: null,
    title: null,
    canStarShare: false,
    errorCode: null,
    errorMsg: null,
    expires: null,
    hasAdditionalFeeds: false,
    hasPerspectives: false,
    hasRecommends: false,
    hasSocialFlow: false,
    hasUpcomingShows: false,
    inProgressFlag: false,
    mode: null,
    recommends: [],
    serverTime: null,
    showStreamCode: null,
    showStreamURL: null,
    sponsorInformation: {
      SponsorFlag: null,
      SponsorLogoURL: null,
      SponsorLinkURL: null,
    },
    status: null,
    statusCode: null,
    twitterLink: null,
  },
  liveShowsFailedResponse: null,
};

export default createReducer(initialState, {
  [FETCH_LIVE_SHOW_INFO_START](state) {
    return {
      ...state,
      ...initialState,
      fetchingLiveShows: true,
    };
  },
  [FETCH_LIVE_SHOW_INFO_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingLiveShows: false,
      liveShowsResponse: payload,
    };
  },
  [FETCH_LIVE_SHOW_INFO_FAIL](state, { payload }) {
    return {
      ...state,
      ...initialState,
      fetchingLiveShows: false,
      liveShowsFailedResponse: payload,
    };
  },
});
