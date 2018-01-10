import createReducer from '../utils/createReducer';
import {
  SET_DISPLAY_COMMUNITY_CONTENT,
  BOOTSTRAP_TELESCOPE_DETAILS_START,
  BOOTSTRAP_TELESCOPE_DETAILS,
  BOOTSTRAP_TELESCOPE_DETAILS_FAIL,
  FETCH_TELESCOPE_STATUS_START,
  FETCH_TELESCOPE_STATUS_SUCCESS,
  FETCH_TELESCOPE_STATUS_FAIL,
  RESET_CURRENT_OBSERVATORY_STATUS,
  SET_CURRENT_OBSERVATORY_STATUS,
  FETCH_CURRENT_WEATHER_CONDITIONS_START,
  FETCH_CURRENT_WEATHER_CONDITIONS_SUCCESS,
  FETCH_DAY_NIGHT_BAR_PANEL_START,
  FETCH_DAY_NIGHT_BAR_PANEL_SUCCESS,
  FETCH_DAY_NIGHT_MAP_START,
  FETCH_DAY_NIGHT_MAP_SUCCESS,
  FETCH_ALL_SKY_START,
  FETCH_ALL_SKY_SUCCESS,
  FETCH_DOME_CAM_START,
  FETCH_DOME_CAM_SUCCESS,
  SET_CURRENT_OBSERVATORY,
  SET_CURRENT_TELESCOPE,
  RESET_DETAILS_SELECTED_ELEMENTS,
  UPDATE_ACTIVE_SSE,
  RESET_ACTIVE_SSE,
  REMOVE_IMAGE_VIEWER_CLIP_STATE,
  APPLY_IMAGE_VIEWER_CLIP_STATE,
  START_FETCH_UPCOMING_MISSIONS,
  SUCCESS_FETCH_UPCOMING_MISSIONS,
  FAIL_FETCH_UPCOMING_MISSIONS,
} from './actions';


const initialState = {
  fetchingObservatoryList: true,
  fetchingObservatoryListFail: false,
  fetchingObservatoryListErrorBody: null,

  isImageViewerClipped: true,

  displayCommunityContent: false,

  currentObservatory: null,
  currentTelescope: {
    teleInstrumentList: [],
  },

  fetchingObservatoryStatus: true,
  currentTelescopeOnlineStatus: null,
  allObservatoryTelescopeStatus: {
    countdownList: {
      countdownTeleList: [],
    },
  },

  fetchingWeatherWidget: false,
  fetchingDayNightBarPanel: false,
  fetchingDayNightMap: false,
  fetchingAllSkyCamera: false,
  fetchingDomeCam: false,
  weatherConditionWidgetResult: {
    apiError: false,
    title: 'Fetching weather',
    subtitle: '',
    credits: '',
    refreshIntervalSec: 0,
    currentConditionsURL: '',
  },
  dayNightBarPanel: {
    apiError: false,
    refreshIntervalSec: 0,
    dayNightBarPanelURL: '',
  },
  dayNightMap: {
    apiError: false,
    refreshIntervalSec: 0,
    dayNightMapURL: '',
  },
  allSkyCamera: {
    apiError: false,
    refreshIntervalSec: 0,
    offlineImageURL: '',
    allSkyCamURL: '',
    onlineStatus: '',
  },
  domeCam: {
    apiError: false,
    refreshIntervalSec: 0,
    offlineImageURL: '',
    domeCamURL: '',
    onlineStatus: '',
  },

  activeSSE: {
    astroObjectID: 0,
  },

  upcomingMissions: {
    timestamp: 0,
    expired: 0,
    upcomingMissionCount: 0,
    upcomingMissionArray: [],
  },
};

export default createReducer(initialState, {
  [SET_DISPLAY_COMMUNITY_CONTENT](state, { payload }) {
    return {
      ...state,
      displayCommunityContent: payload,
    };
  },
  [RESET_DETAILS_SELECTED_ELEMENTS](state) {
    return {
      ...state,
      currentObservatory: null,
      currentTelescope: {
        teleInstrumentList: [],
      },
    };
  },
  [FETCH_TELESCOPE_STATUS_START](state) {
    return {
      ...state,
      fetchingObservatoryStatus: true,
      currentTelescopeOnlineStatus: null,
      allObservatoryTelescopeStatus: { ...initialState.allObservatoryTelescopeStatus },
    };
  },
  [FETCH_TELESCOPE_STATUS_SUCCESS](state, { payload }) {
    return {
      ...state,
      allObservatoryTelescopeStatus: payload,
    };
  },
  [FETCH_TELESCOPE_STATUS_FAIL](state) {
    return {
      ...state,
    };
  },
  [RESET_CURRENT_OBSERVATORY_STATUS](state) {
    return {
      ...state,
    };
  },
  [SET_CURRENT_OBSERVATORY_STATUS](state, { currentTelescopeOnlineStatus }) {
    return {
      ...state,
      fetchingObservatoryStatus: false,
      currentTelescopeOnlineStatus,
    };
  },
  [BOOTSTRAP_TELESCOPE_DETAILS_START](state) {
    return {
      ...state,
      fetchingObservatoryList: true,
      fetchingObservatoryListFail: false,
      fetchingObservatoryListErrorBody: null,
    };
  },
  [BOOTSTRAP_TELESCOPE_DETAILS](state) {
    return {
      ...state,
      fetchingObservatoryList: false,
      fetchingObservatoryListFail: false,
      fetchingObservatoryListErrorBody: null,
    };
  },
  [BOOTSTRAP_TELESCOPE_DETAILS_FAIL](state, { payload }) {
    return {
      ...state,
      fetchingObservatoryList: false,
      fetchingObservatoryListFail: true,
      fetchingObservatoryListErrorBody: payload,
    };
  },
  [SET_CURRENT_OBSERVATORY](state, { currentObservatory }) {
    return {
      ...state,
      currentObservatory,
    };
  },
  [SET_CURRENT_TELESCOPE](state, { currentTelescope }) {
    return {
      ...state,
      currentTelescope,
    };
  },
  [FETCH_DOME_CAM_START](state) {
    return {
      ...state,
      fetchingDomeCam: true,
      domeCam: { ...initialState.domeCam },
    };
  },
  [FETCH_DOME_CAM_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingDomeCam: false,
      domeCam: payload,
    };
  },
  [FETCH_ALL_SKY_START](state) {
    return {
      ...state,
      fetchingAllSkyCamera: true,
      allSkyCamera: { ...initialState.allSkyCamera },
    };
  },
  [FETCH_ALL_SKY_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingAllSkyCamera: false,
      allSkyCamera: payload,
    };
  },
  [FETCH_DAY_NIGHT_MAP_START](state) {
    return {
      ...state,
      fetchingDayNightMap: true,
      dayNightMap: { ...initialState.dayNightMap },
    };
  },
  [FETCH_DAY_NIGHT_MAP_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingDayNightMap: false,
      dayNightMap: payload,
    };
  },
  [FETCH_CURRENT_WEATHER_CONDITIONS_START](state) {
    return {
      ...state,
      fetchingWeatherWidget: true,
      weatherConditionWidgetResult: { ...initialState.weatherConditionWidgetResult },
    };
  },
  [FETCH_CURRENT_WEATHER_CONDITIONS_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingWeatherWidget: false,
      weatherConditionWidgetResult: payload,
    };
  },
  [FETCH_DAY_NIGHT_BAR_PANEL_START](state) {
    return {
      ...state,
      fetchingDayNightBarPanel: true,
      dayNightBarPanel: { ...initialState.dayNightBarPanel },
    };

  },
  [FETCH_DAY_NIGHT_BAR_PANEL_SUCCESS](state, { payload }) {

    return {
      ...state,
      fetchingDayNightBarPanel: false,
      dayNightBarPanel: payload,
    };
  },
  [UPDATE_ACTIVE_SSE](state, { payload }) {
    return {
      ...state,
      activeSSE: payload,
    };
  },
  [RESET_ACTIVE_SSE](state) {
    return {
      ...state,
      activeSSE: Object.assign({}, initialState.activeSSE),
    };
  },
  [REMOVE_IMAGE_VIEWER_CLIP_STATE](state) {
    return {
      ...state,
      isImageViewerClipped: false,
    };
  },
  [APPLY_IMAGE_VIEWER_CLIP_STATE](state) {
    return {
      ...state,
      isImageViewerClipped: true,
    };
  },
});
