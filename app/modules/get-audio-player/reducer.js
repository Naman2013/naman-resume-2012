import { START_FETCH_PLAYER, SUCCESS_FETCH_PLAYER, FAIL_FETCH_PLAYER } from './actions';

import createReducer from '../utils/createReducer';

const initialState = {
  fetchAPIContentError: false,
  fetchAPIContentErrorBody: {},
  loadingContent: false,
  ver: 'v1',
  lang: 'en',
  timestamp: 0,
  apiError: false,
  errorCode: 0,
  errorMsg: '',
  statusCode: 0,
  expires: 0,
  userIsLoggedIn: false,
  showAudioPlayerBeforeLive: false,
  showAudioPlayerWhenLive: false,
  backgroundColorRGB: '#465763',
  playAudioWhenLive: false,
  streamURL: 'https://www.youtube.com/embed/',
  streamCode: '',
  showTitle: false,
  titleText: '',
  titleColorRGB: '#FFFFFF',
  showSubtitleBeforeLive: false,
  beforeLiveSubtitleText: '',
  beforeLiveSubtitleColorRGB: '#80C3C3',
  showSubtitleWhenLive: false,
  liveSubtitleText: '',
  liveSubtitleColorRGB: '#F310A7',
  showIndicatorWhenLive: false,
  liveIndicatorText: 'LIVE',
  liveIndicatorColorRGB: '#EFD361',
  showVolumeControlWhenLive: false,
  volumeControlColorRGB: '#0F2126',
  showMuteButtonWhenLive: false,
  muteButtonColorRGB: '#0F2126',
  showTooltip: false,
  tooltipText: '',
  tooltipColorRGB: '#FFFFFF',
  tooltipBackgroundRGB: '#3C4A55',
  eventId: 0,
  eventStart: 0,
  eventEnd: 0,
  status: '',
  pageSource: '',
  playerType: 'topbar',
};

export default createReducer(initialState, {
  [START_FETCH_PLAYER](state) {
    return {
      ...state,
      loadingContent: true,
    };
  },
  [SUCCESS_FETCH_PLAYER](state, { payload }) {
    return {
      ...state,
      loadingContent: false,
      ...payload,
    };
  },
  [FAIL_FETCH_PLAYER](state, { payload }) {
    return {
      ...state,
      loadingContent: false,
      fetchAPIContentError: true,
      fetchAPIContentErrorBody: payload,
    };
  },
});
