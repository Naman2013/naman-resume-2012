import createReducer from './utils/createReducer';
import axios from 'axios';

import defaultObservatoryOverviewDetails from '../content/default-observatory-overview-details';

export const OBSERVATORY_REQUEST_SUCCESS = 'OBSERVATORY_REQUEST_SUCCESS';
export const OBSERVATORY_REQUEST_FAIL = 'OBSERVATORY_REQUEST_FAIL';
export const CHANGE_TELESCOPE_OVERVIEW = 'CHANGE_TELESCOPE_OVERVIEW';
export const MOON_PHASE_WIDGET_SUCCESS = 'MOON_PHASE_WIDGET_SUCCESS';
export const SATELLITE_VIEW_WIDGET_RESULT = 'SATELLITE_VIEW_WIDGET_RESULT';

const initialState = {
  observatoryList: [],
  observatoryListError: false,
  currentObservatory: {},
  loadingObservatory: true,
  moonPhaseWidgetResult: null,
  satelliteViewWidgetResult: null
};

export function getObservatoryList(user, currentObservatoryId) {
  return dispatch => {
    return axios.post('/api/obs/list', {
      lang: 'en',
      status: 'live',
      at: user.at,
      cid: user.cid,
      token: user.token,
      listType: 'pageHeader'
    })
    .then((response) => {
      dispatch( observatoryListSuccess( response ) );
      dispatch( setCurrentTelescopeOverview(
        [defaultObservatoryOverviewDetails, ...response.data.observatoryList] , currentObservatoryId ) );
    })
    .catch(error => dispatch( observatoryListError(error) ))
  };
}



export function observatoryListSuccess(observatoryList) {
  return {
    type: OBSERVATORY_REQUEST_SUCCESS,
    observatoryList: observatoryList.data.observatoryList
  };
}

export function observatoryListError(observatoryListError) {
  return {
    type: OBSERVATORY_REQUEST_FAIL,
    observatoryListError: true
  };
}

export function setCurrentTelescopeOverview(observatories, currentObservatoryId) {
  const observatory = observatories.filter(observatory => observatory.obsUniqueId === currentObservatoryId);
  dispatch( fetchWeatherWidgets(observatory) );
  return {
    type: CHANGE_TELESCOPE_OVERVIEW,
    observatoryDetails: observatory[0]
  };
}

export function fetchWeatherWidgets(observatory) {
  fetchMoonPhase(observatory);
  fetchSmallSatelliteView(observatory);
}

export function fetchMoonPhase(observatory) {
  return dispatch => {
    return axios.post('/api/moon/phase', {
      ver: 'v1',
      lang: 'en',
      obsId: observatory.obsId,
      widgetUniqueId: observatory.MoonPhaseWidgetId,
      timestamp: new Date().getTime()
    })
    .then(result => dispatch(setMoonPhaseWidget, result));
  };
}

export function fetchSmallSatelliteView(observatory) {
  return dispatch => {
    return axios.post('/api/wx/satellite', {
      ver: 'v1',
      lang: 'en',
      obsId: observatory.obsId,
      widgetUniqueId: observatory.SatelliteWidgetId,
      timestamp: new Date().getTime()
    })
    .then(result => dispatch(setSatelliteViewWidget(result)));
  };
}

export function setMoonPhaseWidget(moonPhaseWidgetResult) {
  return {
    type: MOON_PHASE_WIDGET_SUCCESS,
    moonPhaseWidget: moonPhaseWidgetResult
  };
}

export function setSatelliteViewWidget(satelliteViewWidgetResult)  {
  return {
    type: SATELLITE_VIEW_WIDGET_RESULT,
    satelliteViewWidgetResult
  };
}


export default createReducer(initialState, {
  [OBSERVATORY_REQUEST_SUCCESS](state, observatoryList) {
    return {
      ...state,
      observatoryList: observatoryList
    };
  },
  [OBSERVATORY_REQUEST_FAIL](state) {
    return {
      ...state,
      observatoryListError: true
    };
  },
  [CHANGE_TELESCOPE_OVERVIEW](state, { observatoryDetails }) {
    return {
      ...state,
      currentObservatory: observatoryDetails
    }
  },
  [MOON_PHASE_WIDGET_SUCCESS](state, moonPhaseWidgetResult) {
    return {
      ...state,
      moonPhaseWidgetResult
    };
  },
  [SATELLITE_VIEW_WIDGET_RESULT](state, satelliteViewWidgetResult) {
    return {
      ...state,
      satelliteViewWidgetResult
    };
  }
});
