import axios from 'axios';
import { push } from 'react-router-redux';
import createReducer from './utils/createReducer';

const OBSERVATORY_REQUEST_SUCCESS = 'OBSERVATORY_REQUEST_SUCCESS';
const OBSERVATORY_REQUEST_FAIL = 'OBSERVATORY_REQUEST_FAIL';

const OBSERVATORY_STATUS_SUCCESS = 'OBSERVATORY_STATUS_SUCCESS';
const OBSERVATORY_STATUS_FAIL = 'OBSERVATORY_STATUS_FAIL';

const MOON_PHASE_WIDGET_SUCCESS = 'MOON_PHASE_WIDGET_SUCCESS';
const SATELLITE_VIEW_WIDGET_SUCCESS = 'SATELLITE_VIEW_WIDGET_SUCCESS';

export const getCurrentObservatory = (observatoryList = [], observatoryId) => {
  return observatoryList.find(observatory => observatory.obsUniqueId === observatoryId);
}
const getCurrentTimeInSeconds = () => new Date().getTime() / 1000;

export const getObservatoryList = (currentObservatoryId) => (dispatch, getState) => {
    // TODO: dispatch loading...
  const { token, at, cid } = getState().user;

  return axios.post('/api/obs/list', {
    at,
    cid,
    token,
    lang: 'en',
    status: 'live',
    listType: 'full'
  })
  .then((response) => {
    const { observatoryList } = response.data;
    const currentObservatory = getCurrentObservatory(observatoryList, currentObservatoryId);

    // if we have an observatory to work with, then call for the telescope availability now
    if (currentObservatory) {
      const { obsId } = currentObservatory;
      dispatch(observatoryListSuccess(response.data));
      dispatch(fetchAllWidgetsByObservatory(currentObservatory));
      dispatch(fetchObservatoryTelescopeStatus(obsId));
    }
  })
  .catch(error => {
    dispatch(observatoryListError(error));
    throw error;
  });
};


export const fetchObservatoryTelescopeStatus = (obsId) => (dispatch) => {
  return axios.get(`/api/obs/getObservatoryStatus?obsId=${obsId}`)
    .then((response) => {
      dispatch(observatoryTelescopeStatusSuccess(response.data));
    })
    .catch(error => dispatch(observatoryTelescopeStatusFail()));
};

const observatoryTelescopeStatusSuccess = (observatoryTelecopeStatus) => ({
  type: OBSERVATORY_STATUS_SUCCESS,
  observatoryTelecopeStatus,
});

const observatoryTelescopeStatusFail = () => ({
  type: OBSERVATORY_STATUS_FAIL,
});

export const fetchAllWidgetsByObservatory = (observatory) => (dispatch) => {
  dispatch(fetchMoonPhase(observatory));
  dispatch(fetchSmallSatelliteView(observatory));
};


export const observatoryListSuccess = (observatoryList) => ({
  type: OBSERVATORY_REQUEST_SUCCESS,
  payload: observatoryList,
});


export const observatoryListError = (error) => ({
  type: OBSERVATORY_REQUEST_FAIL,
  observatoryListError: error,
});

const fetchMoonPhase = observatory => (dispatch, getState) => {
  const { token, at, cid } = getState().user;
  if (observatory) {
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
    .then(result => dispatch( setMoonPhaseWidget(result.data) ) );
  }
};

const fetchSmallSatelliteView = ( observatory ) => ( dispatch, getState ) => {
  const { token, at, cid } = getState().user;
  if (observatory) {
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
  // status of various telescopes depends on having a list of observatories..
  observatoryTelecopeStatus: null,
  moonPhaseWidgetResult: null,
  satelliteViewWidgetResult: null,
};

export default createReducer(initialState, {
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
});
