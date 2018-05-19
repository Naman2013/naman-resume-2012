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
  SET_CURRENT_OBSERVATORY,
  SET_CURRENT_TELESCOPE,
  RESET_DETAILS_SELECTED_ELEMENTS,
  UPDATE_ACTIVE_SSE,
  RESET_ACTIVE_SSE,
  INCREMENT_MISSION_COUNTER,
  RESET_MISSION_COUNTER,
  UPDATE_RECENTLY_VIEWED_MISSION_ID,
  RESET_VIEWED_MISSION_STATE,
} from './actions';


const initialState = {
  fetchingObservatoryList: true,
  fetchingObservatoryListFail: false,
  fetchingObservatoryListErrorBody: null,

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

  activeSSE: {
    astroObjectID: 0,
  },

  viewedMissionsCounter: 0,
  recentlyViewedMissionID: 0,
};

export default createReducer(initialState, {
  [INCREMENT_MISSION_COUNTER](state) {
    return {
      ...state,
      viewedMissionsCounter: state.viewedMissionsCounter + 1,
    };
  },
  [RESET_MISSION_COUNTER](state) {
    return {
      ...state,
      viewedMissionsCounter: 0,
    };
  },
  [UPDATE_RECENTLY_VIEWED_MISSION_ID](state, { missionID }) {
    return {
      ...state,
      recentlyViewedMissionID: missionID,
    };
  },
  [RESET_VIEWED_MISSION_STATE](state) {
    return {
      ...state,
      viewedMissionsCounter: 0,
      recentlyViewedMissionID: 0,
    };
  },
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
});
