import createReducer from '../utils/createReducer';
import {
  BOOTSTRAP_TELESCOPE_DETAILS_START,
  BOOTSTRAP_TELESCOPE_DETAILS,
  BOOTSTRAP_TELESCOPE_DETAILS_FAIL,
  FETCH_CURRENT_WEATHER_CONDITIONS_START,
  FETCH_CURRENT_WEATHER_CONDITIONS_SUCCESS,
  FETCH_DAY_NIGHT_BAR_START,
  FETCH_DAY_NIGHT_BAR_SUCCESS,
  FETCH_DAY_NIGHT_MAP_START,
  FETCH_DAY_NIGHT_MAP_SUCCESS,
  FETCH_ALL_SKY_START,
  FETCH_ALL_SKY_SUCCESS,
  FETCH_DOME_CAM_START,
  FETCH_DOME_CAM_SUCCESS,
  SET_CURRENT_OBSERVATORY,
  SET_CURRENT_TELESCOPE,
} from './actions';


const initialState = {
  fetchingObservatoryList: true,
  fetchingObservatoryListFail: false,
  fetchingObservatoryListErrorBody: null,

  currentObservatory: {},
  currentTelescope: {
    teleInstrumentList: [],
  },

  fetchingWeatherWidget: false,
  fetchingDayNightBar: false,
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
  dayNightBar: {
    apiError: false,
    refreshIntervalSec: 0,
    dayNightBarURL: '',
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
};

export default createReducer(initialState, {
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
  [FETCH_DAY_NIGHT_BAR_START](state) {
    return {
      ...state,
      fetchingDayNightBar: true,
      dayNightBar: { ...initialState.dayNightBar },
    };
  },
  [FETCH_DAY_NIGHT_BAR_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingDayNightBar: false,
      dayNightBar: payload,
    };
  },
});
