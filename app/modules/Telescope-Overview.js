import axios from 'axios';
import createReducer from './utils/createReducer';
import fetchStarChart from '../services/sky-widgets/star-chart';
import fetchFacilityWebcam from '../services/sky-widgets/facility-webcam';

const OBSERVATORY_REQUEST_START = 'OBSERVATORY_REQUEST_START';
const OBSERVATORY_REQUEST_SUCCESS = 'OBSERVATORY_REQUEST_SUCCESS';
const OBSERVATORY_REQUEST_FAIL = 'OBSERVATORY_REQUEST_FAIL';

const OBSERVATORY_STATUS_SUCCESS = 'OBSERVATORY_STATUS_SUCCESS';
const OBSERVATORY_STATUS_FAIL = 'OBSERVATORY_STATUS_FAIL';

const MOON_PHASE_WIDGET_SUCCESS = 'MOON_PHASE_WIDGET_SUCCESS';

const SATELLITE_VIEW_WIDGET_SUCCESS = 'SATELLITE_VIEW_WIDGET_SUCCESS';

const SKYCHART_WIDGET_SUCCESS = 'SKYCHART_WIDGET_SUCCESS';
const SKYCHART_WIDGET_START = 'SKYCHART_WIDGET_START';

const OBSERVATORY_WEBCAM_START = 'OBSERVATORY_WEBCAM_START';
const OBSERVATORY_WEBCAM_SUCCESS = 'OBSERVATORY_WEBCAM_SUCCESS';


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

export const fetchSkyChartWidget = ({ obsId, AllskyWidgetId, scheduledMissionId }) => (dispatch) => {
  dispatch(startFetchSkyChartWidget);
  if (obsId && AllskyWidgetId && scheduledMissionId) {
    fetchStarChart({
      scheduledMissionId,
      obsId,
      widgetUniqueId: AllskyWidgetId,
    }).then((result) => {
      if (!result.data.apiError) {
        dispatch(setSkyChartWidget(result.data));
      }
    });
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

  fetchingObservatoryLiveWebcamResult: true,

  // status of various telescopes depends on having a list of observatories..
  observatoryTelecopeStatus: null,
  moonPhaseWidgetResult: null,
  satelliteViewWidgetResult: null,
  skyChartWidgetResult: {
    apiError: false,
    title: '',
    subTitle: '',
    starChartURL: '',
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
});
