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
    apiError: null,
    title: null,
    mode: null,
    inProgressFlag: null,
    expires: null,
    serverTime: null,
    sponsorInformation: {
      SponsorFlag: null,
      SponsorLogoURL: null,
      SponsorLinkURL: null,
    },
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
