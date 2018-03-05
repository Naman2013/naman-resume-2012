import axios from 'axios';
import createReducer from './utils/createReducer';
import fetchStarChart from '../services/sky-widgets/star-chart';
import fetchFacilityWebcam from '../services/sky-widgets/facility-webcam';
import fetchMoonlightBar from '../services/sky-widgets/moonlight-bar';
import fetchSeeingConditionsBar from '../services/sky-widgets/seeing-conditions-bar';

/* weather conditions */
import fetchWeatherConditionsWidget from '../services/sky-widgets/weather-conditions';
import fetchWeatherForecastWidget from '../services/sky-widgets/weather-forecast';
import fetchWeatherSatelliteWidget from '../services/sky-widgets/weather-satellite';
import fetchWeatherMissionControlStatusWidget from '../services/sky-widgets/weather-mission-control-status';

import fetchDomeCam from '../services/sky-widgets/dome-cam';
import fetchDomeCamTimelapse from '../services/sky-widgets/dome-cam-timelapse';

import fetchAllSkyCamera from '../services/sky-widgets/all-sky-camera';
import fetchAllSkyTimelapse from '../services/sky-widgets/all-sky-timelapse';

const OBSERVATORY_REQUEST_START = 'OBSERVATORY_REQUEST_START';
const OBSERVATORY_REQUEST_SUCCESS = 'OBSERVATORY_REQUEST_SUCCESS';
const OBSERVATORY_REQUEST_FAIL = 'OBSERVATORY_REQUEST_FAIL';

const OBSERVATORY_STATUS_SUCCESS = 'OBSERVATORY_STATUS_SUCCESS';
const OBSERVATORY_STATUS_FAIL = 'OBSERVATORY_STATUS_FAIL';

const MOON_PHASE_WIDGET_SUCCESS = 'MOON_PHASE_WIDGET_SUCCESS';

const SATELLITE_VIEW_WIDGET_SUCCESS = 'SATELLITE_VIEW_WIDGET_SUCCESS';

const SKYCHART_WIDGET_SUCCESS = 'SKYCHART_WIDGET_SUCCESS';
const SKYCHART_WIDGET_START = 'SKYCHART_WIDGET_START';

const MOONLIGHT_WIDGET_START = 'MOONLIGHT_WIDGET_START';
const MOONLIGHT_WIDGET_SUCCESS = 'MOONLIGHT_WIDGET_SUCCESS';

const SEEING_CONDITIONS_WIDGET_START = 'SEEING_CONDITIONS_WIDGET_START';
const SEEING_CONDITIONS_WIDGET_SUCCESS = 'SEEING_CONDITIONS_WIDGET_SUCCESS';

const OBSERVATORY_WEBCAM_START = 'OBSERVATORY_WEBCAM_START';
const OBSERVATORY_WEBCAM_SUCCESS = 'OBSERVATORY_WEBCAM_SUCCESS';

const WEATHER_FORECAST_WIDGET_START = 'WEATHER_FORECAST_WIDGET_START';
const WEATHER_FORECAST_WIDGET_SUCCESS = 'WEATHER_FORECAST_WIDGET_SUCCESS';

const WEATHER_CONDITIONS_WIDGET_START = 'WEATHER_CONDITIONS_WIDGET_START';
const WEATHER_CONDITIONS_WIDGET_SUCCESS = 'WEATHER_CONDITIONS_WIDGET_SUCCESS';

const WEATHER_SATELLITE_WIDGET_START = 'WEATHER_SATELLITE_WIDGET_START';
const WEATHER_SATELLITE_WIDGET_SUCCESS = 'WEATHER_SATELLITE_WIDGET_SUCCESS';

const WEATHER_MISSION_CONTROL_STATUS_WIDGET_START = 'WEATHER_MISSION_CONTROL_STATUS_WIDGET_START';
const WEATHER_MISSION_CONTROL_STATUS_WIDGET_SUCCESS = 'WEATHER_MISSION_CONTROL_STATUS_WIDGET_SUCCESS';

const TELESCOPE_CARD_DATA_SUCCESS = 'TELESCOPE_CARD_DATA_SUCCESS';
const TELESCOPE_CARD_DATA_FAIL = 'TELESCOPE_CARD_DATA_FAIL';
const TELESCOPE_CARD_DATA_START = 'TELESCOPE_CARD_DATA_START';

const FETCH_ALL_SKY_START = 'FETCH_ALL_SKY_START';
const FETCH_ALL_SKY_SUCCESS = 'FETCH_ALL_SKY_SUCCESS';

const FETCH_DOME_CAM_START = 'FETCH_DOME_CAM_START';
const FETCH_DOME_CAM_SUCCESS = 'FETCH_DOME_CAM_SUCCESS';

const FETCH_DOME_CAM_TIMELAPSE_START = 'FETCH_DOME_CAM_TIMELAPSE_START';
const FETCH_DOME_CAM_TIMELAPSE_SUCCESS = 'FETCH_DOME_CAM_TIMELAPSE_SUCCESS';

const FETCH_ALL_SKY_TIMELAPSE_START = 'FETCH_ALL_SKY_TIMELAPSE_START';
const FETCH_ALL_SKY_TIMELAPSE_SUCCESS = 'FETCH_ALL_SKY_TIMELAPSE_SUCCESS';

export const getCurrentObservatory = (observatoryList = [], observatoryId) => {
  return observatoryList.find(observatory => observatory.obsUniqueId === observatoryId);
};

const getCurrentTimeInSeconds = () => new Date().getTime() / 1000;

const observatoryTelescopeStatusSuccess = observatoryTelecopeStatus => ({
  type: OBSERVATORY_STATUS_SUCCESS,
  observatoryTelecopeStatus,
});

const observatoryTelescopeStatusFail = () => ({
  type: OBSERVATORY_STATUS_FAIL,
});

export const fetchObservatoryTelescopeStatus = obsId => (dispatch) => {
  return axios.get(`/api/obs/getObservatoryStatus?obsId=${obsId}`)
    .then((response) => {
      dispatch(observatoryTelescopeStatusSuccess(response.data));
    })
    .catch(() => dispatch(observatoryTelescopeStatusFail()));
};

const observatoryListStart = () => ({
  type: OBSERVATORY_REQUEST_START,
});

export const observatoryListSuccess = payload => ({
  type: OBSERVATORY_REQUEST_SUCCESS,
  payload,
});


export const observatoryListError = error => ({
  type: OBSERVATORY_REQUEST_FAIL,
  observatoryListError: error,
});

export const fetchAllWidgetsByObservatory = observatory => (dispatch) => {
  dispatch(fetchMoonPhase(observatory));
  dispatch(fetchSmallSatelliteView(observatory));
};

// @param: callSource : STRING | details || byTelescope
export const getObservatoryList = (currentObservatoryId, callSource) => (dispatch, getState) => {
  dispatch(observatoryListStart());
  const { token, at, cid } = getState().user;
  return axios.post('/api/obs/list', {
    at,
    cid,
    token,
    callSource,
    lang: 'en',
    status: 'live',
    listType: 'full',
  })
  .then((response) => {
    const { observatoryList } = response.data;
    const currentObservatory = getCurrentObservatory(observatoryList, currentObservatoryId);
    dispatch(observatoryListSuccess(response.data));

    // if we have an observatory to work with, then call for the telescope availability now
    if (currentObservatory) {
      const { obsId } = currentObservatory;
      dispatch(fetchAllWidgetsByObservatory(currentObservatory));
      dispatch(fetchObservatoryTelescopeStatus(obsId));
    }
  })
  .catch((error) => {
    dispatch(observatoryListError(error));
    throw error;
  });
};

const fetchMoonPhase = observatory => (dispatch, getState) => {
  const { token, at, cid } = getState().user;

   // only make call if /api/obs/list response has MoonPhaseWidgetId defined
  if (observatory && observatory.MoonPhaseWidgetId) {
    return axios.post('/api/moon/phase', {
      token,
      at,
      cid,
      ver: 'v1',
      lang: 'en',
      obsId: observatory.obsId,
      widgetUniqueId: observatory.MoonPhaseWidgetId,
      timestamp: getCurrentTimeInSeconds(),
    })
    .then(result => dispatch(setMoonPhaseWidget(result.data)));
  }
};

const fetchSmallSatelliteView = observatory => (dispatch, getState) => {
  const { token, at, cid } = getState().user;
  if (observatory && observatory.SatelliteWidgetId) {  // only make call if /api/obs/list response has SatelliteWidgetId defined
    return axios.post('/api/wx/satellite', {
      token,
      at,
      cid,
      ver: 'v1',
      lang: 'en',
      obsId: observatory.obsId,
      widgetUniqueId: observatory.SatelliteWidgetId,
      timestamp: getCurrentTimeInSeconds(),
    })
    .then(result => dispatch(setSatelliteViewWidget(result.data)));
  }
};

const setMoonPhaseWidget = moonPhaseWidgetResult => ({
  type: MOON_PHASE_WIDGET_SUCCESS,
  moonPhaseWidgetResult,
});

export const setSatelliteViewWidget = satelliteViewWidgetResult => ({
  type: SATELLITE_VIEW_WIDGET_SUCCESS,
  satelliteViewWidgetResult,
});

const setSkyChartWidget = skyChartWidgetResult => ({
  type: SKYCHART_WIDGET_SUCCESS,
  skyChartWidgetResult,
});

const startFetchSkyChartWidget = () => ({
  type: SKYCHART_WIDGET_START,
});

export const fetchSkyChartWidget = ({ obsId, skyChartWidgetId, scheduledMissionId }) => (dispatch) => {
  dispatch(startFetchSkyChartWidget);
  if (obsId && skyChartWidgetId && scheduledMissionId) {
    fetchStarChart({
      scheduledMissionId,
      obsId,
      widgetUniqueId: skyChartWidgetId,
    }).then((result) => {
      if (!result.data.apiError) {
        dispatch(setSkyChartWidget(result.data));
      }
    });
  }
};

const startFetchMoonlightWidget = () => ({
  type: MOONLIGHT_WIDGET_START,
});

const successMoonlightWidget = payload => ({
  type: MOONLIGHT_WIDGET_SUCCESS,
  payload,
});

export const fetchMoonlightWidget = ({ obsId, widgetUniqueId }) => (dispatch) => {
  dispatch(startFetchMoonlightWidget());
  if (obsId && widgetUniqueId) {
    fetchMoonlightBar({
      obsId,
      widgetUniqueId,
    }).then(result => dispatch(successMoonlightWidget(result.data)));
  }
};

const startFetchSeeingConditionsWidget = () => ({
  type: SEEING_CONDITIONS_WIDGET_START,
});

const successSeeingConditionsWidget = payload => ({
  type: SEEING_CONDITIONS_WIDGET_SUCCESS,
  payload,
});

export const fetchSeeingConditionsWidget = ({ obsId, widgetUniqueId }) => (dispatch) => {
  dispatch(startFetchSeeingConditionsWidget());
  if (obsId && widgetUniqueId) {
    fetchSeeingConditionsBar({
      obsId,
      widgetUniqueId,
    }).then(result => dispatch(successSeeingConditionsWidget(result.data)));
  }
};

const startFetchObservatoryWebcam = () => ({
  type: OBSERVATORY_WEBCAM_START,
});

const fetchObservatoryWebcamSuccess = observatoryLiveWebcamResult => ({
  type: OBSERVATORY_WEBCAM_SUCCESS,
  observatoryLiveWebcamResult,
});

// TODO: should this be made available through telescope details?
export const fetchObservatoryWebcam = ({
  obsId,
  facilityWebcamWidgetId,
}) => (dispatch) => {
  dispatch(startFetchObservatoryWebcam());
  return fetchFacilityWebcam({
    obsId,
    widgetUniqueId: facilityWebcamWidgetId,
  }).then((result) => {
    if (!result.data.apiError) {
      dispatch(fetchObservatoryWebcamSuccess(result.data));
    }
  });
};

/* weather conditions */
const startWeatherConditions = () => ({
  type: WEATHER_CONDITIONS_WIDGET_START,
});

const fetchWeatherConditionsSuccess = weatherConditionsWidgetResult => ({
  type: WEATHER_CONDITIONS_WIDGET_SUCCESS,
  weatherConditionsWidgetResult,
});

export const fetchWeatherConditions = ({
  obsId,
  weatherConditionsWidgetId,
}) => (dispatch) => {
  dispatch(startWeatherConditions());
  return fetchWeatherConditionsWidget({
    obsId,
    widgetUniqueId: weatherConditionsWidgetId,
  }).then((result) => {
    if (!result.data.apiError) {
      dispatch(fetchWeatherConditionsSuccess(result.data));
    }
  });
};

/* weather forecast */
const startWeatherForecast = () => ({
  type: WEATHER_FORECAST_WIDGET_START,
});

const fetchWeatherForecastSuccess = weatherForecastWidgetResult => ({
  type: WEATHER_FORECAST_WIDGET_SUCCESS,
  weatherForecastWidgetResult,
});

export const fetchWeatherForecast = ({
  obsId,
  miniWeatherPanelWidgetId,
}) => (dispatch) => {
  dispatch(startWeatherForecast());

  return fetchWeatherForecastWidget({
    obsId,
    widgetUniqueId: miniWeatherPanelWidgetId,
  }).then((result) => {
    if (!result.data.apiError) {
      dispatch(fetchWeatherForecastSuccess(result.data));
    }
  });
};


/* weather satellite */
const startWeatherSatellite = () => ({
  type: WEATHER_SATELLITE_WIDGET_START,
});

const fetchWeatherSatelliteSuccess = weatherSatelliteWidgetResult => ({
  type: WEATHER_SATELLITE_WIDGET_SUCCESS,
  weatherSatelliteWidgetResult,
});

export const fetchWeatherSatellite = ({
  obsId,
  satelliteWidgetId,
}) => (dispatch) => {
  dispatch(startWeatherSatellite());
  return fetchWeatherSatelliteWidget({
    obsId,
    widgetUniqueId: satelliteWidgetId,
  }).then((result) => {
    if (!result.data.apiError) {
      dispatch(fetchWeatherSatelliteSuccess(result.data));
    }
  });
};

/* weather mission control status */
const startWeatherMissionControlStatus = () => ({
  type: WEATHER_MISSION_CONTROL_STATUS_WIDGET_START,
});

const fetchWeatherMissionControlStatusSuccess = weatherMissionControlStatusWidgetResult => ({
  type: WEATHER_MISSION_CONTROL_STATUS_WIDGET_SUCCESS,
  weatherMissionControlStatusWidgetResult,
});

export const fetchWeatherMissionControlStatus = ({
  obsId,
  missionControlStatusWidgetId,
}) => (dispatch) => {
  dispatch(startWeatherMissionControlStatus());
  return fetchWeatherMissionControlStatusWidget({
    obsId,
    widgetUniqueId: missionControlStatusWidgetId,
  }).then((result) => {
    if (!result.data.apiError) {
      dispatch(fetchWeatherMissionControlStatusSuccess(result.data));
    }
  });
};

const fetchAllSkyStart = () => ({
  type: FETCH_ALL_SKY_START,
});

const fetchAllSkySuccess = payload => ({
  type: FETCH_ALL_SKY_SUCCESS,
  payload,
});

export const fetchAllSkyAction = ({ obsId, AllskyWidgetId }) => (dispatch) => {
  dispatch(fetchAllSkyStart());
  return fetchAllSkyCamera({
    obsId,
    AllskyWidgetId,
  }).then(result => dispatch(fetchAllSkySuccess(result.data)));
};

const fetchDomeCamStart = () => ({
  type: FETCH_DOME_CAM_START,
});

const fetchDomeCamSuccess = payload => ({
  type: FETCH_DOME_CAM_SUCCESS,
  payload,
});

export const fetchDomeCamAction = ({ obsId, DomecamWidgetId }) => (dispatch) => {
  dispatch(fetchDomeCamStart());
  return fetchDomeCam({
    obsId,
    DomecamWidgetId,
  }).then(result => dispatch(fetchDomeCamSuccess(result.data)));
};

const fetchDomeCamTimelapseStart = () => ({
  type: FETCH_DOME_CAM_TIMELAPSE_START,
});

const fetchDomeCamTimelapseSuccess = payload => ({
  type: FETCH_DOME_CAM_TIMELAPSE_SUCCESS,
  payload,
});

export const fetchDomeCamTimelapseAction = ({ obsId, DomecamTimelapseWidgetId }) => (dispatch) => {
  dispatch(fetchDomeCamTimelapseStart());
  return fetchDomeCamTimelapse({
    obsId,
    DomecamTimelapseWidgetId,
  }).then(result => dispatch(fetchDomeCamTimelapseSuccess(result.data)));
};

const fetchAllSkyTimelapseStart = () => ({
  type: FETCH_ALL_SKY_TIMELAPSE_START,
});

const fetchAllSkyTimelapseSuccess = payload => ({
  type: FETCH_ALL_SKY_TIMELAPSE_SUCCESS,
  payload,
});

export const fetchAllSkyTimelapseAction = ({ obsId, AllskyTimelapseWidgetId }) => (dispatch) => {
  console.log('here');
  dispatch(fetchAllSkyTimelapseStart());
  return fetchAllSkyTimelapse({
    obsId,
    AllskyTimelapseWidgetId,
  }).then(result => dispatch(fetchAllSkyTimelapseSuccess(result.data)));
};

const fetchTelescopeCardDataSuccess = telescopeCardData => ({
  type: TELESCOPE_CARD_DATA_SUCCESS,
  telescopeCardData,
});

const fetchTelescopeCardDataFail = () => ({
  type: TELESCOPE_CARD_DATA_FAIL,
});

const fetchTelescopeCardDataStart = () => ({
  type: TELESCOPE_CARD_DATA_START,
});

export const fetchTelescopeCardData = () => (dispatch, getState) => {

  const { telescopeOverview: { telescopeCardData } } = getState();

  // if (telescopeCardData) {
  //   return;
  // }

  dispatch(fetchTelescopeCardDataStart());

  return axios.post('/api/obs/getTelescopeCardData')
    .then((response) => {
      dispatch(fetchTelescopeCardDataSuccess(response.data));
    })
    .catch(() => dispatch(fetchTelescopeCardDataFail()));
};


const initialState = {
  // list of available observatories
  observatoryList: {
    apiError: false,
    errorCode: 0,
    statusCode: 0,
    errorMsg: '',
    observatoryList: [],
  },

  observatoryListErrorBody: null,

  fetchingAllSkyCamera: true,
  fetchingAllSkyTimelapseWidgetResult: true,
  fetchingDomeCamWidgetResult: true,
  fetchingDomeCamTimelapseWidgetResult: true,
  fetchingSeeingConditionsResult: true,
  fetchingObservatoryLiveWebcamResult: true,
  fetchingWeatherForecastWidgetResult: true,
  fetchingWeatherConditionsWidgetResult: true,
  fetchingWeatherSatelliteWidgetResult: true,
  fetchingWeatherMissionControlStatusWidgetResult: true,

  // status of various telescopes depends on having a list of observatories..
  observatoryTelecopeStatus: null,
  moonPhaseWidgetResult: null,
  satelliteViewWidgetResult: null,
  seeingConditionsWidgetResult: null,
  skyChartWidgetResult: {
    apiError: false,
    title: '',
    subTitle: '',
    starChartURL: '',
  },
  moonlightWidgetResult: {
    apiError: false,
    title: '',
    subtitle: '',
    refreshInterval: 0,
    subwidgets: [],
  },
  seeingConditionsWidgetResult: {
    title: '',
    subtitle: '',
    refreshIntervalSec: 0,
    seeingConditionsIndex: 0,
    seeingConditionsDescription: '',
    seeingConditionsColor: '#FFFFFF',
  },
  observatoryLiveWebcamResult: {
    apiError: false,
    title: 'Loading',
    subtitle: '',
    credits: '',
    logoURL: '',
    refreshIntervalSec: 0,
    facilityWebcamURL: '',
  },
  weatherForecastWidgetResult: {
    title: 'Loading',
    apiError: false,
    refreshIntervalSec: 0,
    miniWeatherPanelURL: '',
  },
  weatherConditionsWidgetResult: {
    title: 'Loading',
    apiError: false,
    refreshIntervalSec: 0,
    weatherConditionsURL: '',
  },
  weatherSatelliteWidgetResult: {
    title: 'Loading',
    apiError: false,
    refreshIntervalSec: 0,
    satelliteImageURL: '',
  },
  weatherMissionControlStatusWidgetResult: {
    title: 'Loading',
    apiError: false,
    refreshIntervalSec: 0,
    missionControlStatusURL: '',
  },
  domeCamWidgetResult: {
    domeCamTitle: 'Loading',
    refreshIntervalSec: 0,
    domeCamURL: '',
    offlineImageURL: '',
    offlineStatus: '',
  },
  domeCamTimelapseWidgetResult: {
    domeCamTimelapseTitle: 'Loading',
    refreshIntervalSec: 0,
    domeCamTimelapseURL: '',
    offlineImageURL: '',
    offlineStatus: '',
  },
  allSkyWidgetResult: {
    apiError: false,
    refreshIntervalSec: 0,
    offlineImageURL: '',
    allSkyCamURL: '',
    onlineStatus: '',
    title: '',
  },
  allSkyTimelapseWidgetResult: {
    title: 'Loading',
    refreshIntervalSec: 0,
    allSkyTimelapseURL: '',
    offlineImageURL: '',
    offlineStatus: '',
  },

  telescopeCardData: undefined,
  isTelescopeCardDataLoading: false,
};

export default createReducer(initialState, {
  [OBSERVATORY_REQUEST_START](state) {
    return {
      ...state,
      observatoryList: { ...initialState.observatoryList },
    };
  },
  [OBSERVATORY_REQUEST_SUCCESS](state, { payload }) {
    return {
      ...state,
      observatoryList: payload,
    };
  },
  [OBSERVATORY_REQUEST_FAIL](state, { observatoryListErrorBody }) {
    return {
      ...state,
      observatoryListErrorBody,
    };
  },
  [OBSERVATORY_STATUS_SUCCESS](state, { observatoryTelecopeStatus }) {
    return {
      ...state,
      observatoryTelecopeStatus,
    };
  },
  [OBSERVATORY_STATUS_FAIL](state) {
    return {
      ...state,
      observatoryTelecopeStatus: null,
    };
  },
  [MOON_PHASE_WIDGET_SUCCESS](state, { moonPhaseWidgetResult }) {
    return {
      ...state,
      moonPhaseWidgetResult,
    };
  },
  [SATELLITE_VIEW_WIDGET_SUCCESS](state, { satelliteViewWidgetResult }) {
    return {
      ...state,
      satelliteViewWidgetResult,
    };
  },
  [SKYCHART_WIDGET_START](state) {
    return {
      ...state,
      skyChartWidgetResult: { ...initialState.skyChartWidgetResult },
    };
  },
  [SKYCHART_WIDGET_SUCCESS](state, { skyChartWidgetResult }) {
    return {
      ...state,
      skyChartWidgetResult,
    };
  },
  [OBSERVATORY_WEBCAM_START](state) {
    return {
      ...state,
      fetchingObservatoryLiveWebcamResult: true,
      observatoryLiveWebcamResult: { ...initialState.observatoryLiveWebcamResult },
    };
  },
  [OBSERVATORY_WEBCAM_SUCCESS](state, { observatoryLiveWebcamResult }) {
    return {
      ...state,
      fetchingObservatoryLiveWebcamResult: false,
      observatoryLiveWebcamResult,
    };
  },
  [WEATHER_FORECAST_WIDGET_START](state) {
    return {
      ...state,
      fetchingWeatherForecastWidgetResult: true,
      weatherForecastWidgetResult: { ...initialState.weatherForecastWidgetResult },
    };
  },
  [WEATHER_FORECAST_WIDGET_SUCCESS](state, { weatherForecastWidgetResult }) {
    return {
      ...state,
      fetchingWeatherForecastWidgetResult: false,
      weatherForecastWidgetResult,
    };
  },
  [WEATHER_SATELLITE_WIDGET_START](state) {
    return {
      ...state,
      fetchingWeatherSatelliteWidgetResult: true,
      weatherSatelliteWidgetResult: { ...initialState.weatherSatelliteWidgetResult },
    };
  },
  [WEATHER_SATELLITE_WIDGET_SUCCESS](state, { weatherSatelliteWidgetResult }) {
    return {
      ...state,
      fetchingWeatherSatelliteWidgetResult: false,
      weatherSatelliteWidgetResult,
    };
  },
  [WEATHER_CONDITIONS_WIDGET_START](state) {
    return {
      ...state,
      fetchingWeatherConditionsWidgetResult: true,
      weatherConditionsWidgetResult: { ...initialState.weatherConditionsWidgetResult },
    };
  },
  [WEATHER_CONDITIONS_WIDGET_SUCCESS](state, { weatherConditionsWidgetResult }) {
    return {
      ...state,
      fetchingWeatherConditionsWidgetResult: false,
      weatherConditionsWidgetResult,
    };
  },
  [WEATHER_MISSION_CONTROL_STATUS_WIDGET_START](state) {
    return {
      ...state,
      fetchingWeatherMissionControlStatusWidgetResult: true,
      weatherMissionControlStatusWidgetResult: { ...initialState.weatherMissionControlStatusWidgetResult },
    };
  },
  [WEATHER_MISSION_CONTROL_STATUS_WIDGET_SUCCESS](state, { weatherMissionControlStatusWidgetResult }) {
    return {
      ...state,
      fetchingWeatherMissionControlStatusWidgetResult: false,
      weatherMissionControlStatusWidgetResult,
    };
  },
  [TELESCOPE_CARD_DATA_START](state) {
    return {
      ...state,
      isTelescopeCardDataLoading: true,
    };
  },
  [TELESCOPE_CARD_DATA_SUCCESS](state, { telescopeCardData }) {
    return {
      ...state,
      telescopeCardData,
      isTelescopeCardDataLoading: false,
    };
  },
  [TELESCOPE_CARD_DATA_FAIL](state) {
    return {
      ...state,
      telescopeCardData: null,
      isTelescopeCardDataLoading: false,
    };
  },
  [MOONLIGHT_WIDGET_START](state) {
    return {
      ...state,
      moonlightWidgetResult: { ...initialState.moonlightWidgetResult },
    };
  },
  [MOONLIGHT_WIDGET_SUCCESS](state, { payload }) {
    return {
      ...state,
      moonlightWidgetResult: payload,
    };
  },
  [SEEING_CONDITIONS_WIDGET_START](state) {
    return {
      ...state,
      seeingConditionsWidgetResult: { ...initialState.seeingConditionsWidgetResult },
    };
  },
  [SEEING_CONDITIONS_WIDGET_SUCCESS](state, { payload }) {
    return {
      ...state,
      seeingConditionsWidgetResult: payload,
    };
  },
  [FETCH_ALL_SKY_START](state) {
    return {
      ...state,
      fetchingAllSkyCamera: true,
      allSkyWidgetResult: { ...initialState.allSkyWidgetResult },
    };
  },
  [FETCH_ALL_SKY_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingAllSkyCamera: false,
      allSkyWidgetResult: payload,
    };
  },
  [FETCH_DOME_CAM_START](state) {
    return {
      ...state,
      fetchingDomeCamWidgetResult: true,
      domeCamWidgetResult: { ...initialState.domeCamWidgetResult },
    };
  },
  [FETCH_DOME_CAM_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingDomeCamWidgetResult: false,
      domeCamWidgetResult: payload,
    };
  },
  [FETCH_DOME_CAM_START](state) {
    return {
      ...state,
      fetchingDomeCamTimelapseWidgetResult: true,
      domeCamTimelapseWidgetResult: { ...initialState.domeCamTimelapseWidgetResult },
    };
  },
  [FETCH_DOME_CAM_TIMELAPSE_START](state) {
    return {
      ...state,
      fetchingDomeCamTimelapseWidgetResult: true,
      domeCamTimelapseWidgetResult: { ...initialState.domeCamTimelapseWidgetResult },
    };
  },
  [FETCH_DOME_CAM_TIMELAPSE_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingDomeCamTimelapseWidgetResult: false,
      domeCamTimelapseWidgetResult: payload,
    };
  },
  [FETCH_ALL_SKY_TIMELAPSE_START](state) {
    return {
      ...state,
      fetchingAllSkyTimelapseWidgetResult: true,
      allSkyTimelapseWidgetResult: { ...initialState.allSkyTimelapseWidgetResult },
    };
  },
  [FETCH_ALL_SKY_TIMELAPSE_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingAllSkyTimelapseWidgetResult: false,
      allSkyTimelapseWidgetResult: payload,
    };
  },

});
