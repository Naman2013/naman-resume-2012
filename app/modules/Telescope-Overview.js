import createReducer from './utils/createReducer';
import axios from 'axios';

import defaultObservatoryOverviewDetails from '../content/default-observatory-overview-details';

export const OBSERVATORY_REQUEST_SUCCESS = 'OBSERVATORY_REQUEST_SUCCESS';
export const OBSERVATORY_REQUEST_FAIL = 'OBSERVATORY_REQUEST_FAIL';
export const CHANGE_TELESCOPE_OVERVIEW = 'CHANGE_TELESCOPE_OVERVIEW';
export const MOON_PHASE_WIDGET_SUCCESS = 'MOON_PHASE_WIDGET_SUCCESS';

const initialState = {
  observatoryList: [],
  observatoryListError: false,
  currentObservatory: {},
  loadingObservatory: true,
  moonPhaseWidgetResult: null
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

export function setMoonPhaseWidget(moonPhaseWidgetResult) {
  return {
    type: MOON_PHASE_WIDGET_SUCCESS,
    moonPhaseWidget: moonPhaseWidgetResult
  };
}


export default createReducer(initialState, {
  [OBSERVATORY_REQUEST_SUCCESS](state, { observatoryList }) {
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
  }
});
