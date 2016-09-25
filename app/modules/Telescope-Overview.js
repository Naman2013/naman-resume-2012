import createReducer from './utils/createReducer';
import axios from 'axios';

/**
  HACK
  we patch this default observatory to the response
  to provide data for the "All observatories"
  Hopefully we will this returned from the API
*/
import defaultObservatoryOverviewDetails from '../content/default-observatory-overview-details';

export const OBSERVATORY_REQUEST_SUCCESS = 'OBSERVATORY_REQUEST_SUCCESS';
export const OBSERVATORY_REQUEST_FAIL = 'OBSERVATORY_REQUEST_FAIL';
export const MOON_PHASE_WIDGET_SUCCESS = 'MOON_PHASE_WIDGET_SUCCESS';
export const SATELLITE_VIEW_WIDGET_RESULT = 'SATELLITE_VIEW_WIDGET_RESULT';

const initialState = {
  observatoryList: [], // list of available observatories
  moonPhaseWidgetResult: null,
  satelliteViewWidgetResult: null,
  weatherWidgetResult: null,
  whereOnEarthWidgetResult: null
};

export const getObservatoryList = (user, currentObservatoryId) => (dispatch) => {
    // TODO: dispatch loading...
    return axios.post('/api/obs/list', {
      lang: 'en',
      status: 'live',
      at: user.at,
      cid: user.cid,
      token: user.token,
      listType: 'pageHeader'
    })
    .then((response) => {
      const observatoryList = [defaultObservatoryOverviewDetails, ...response.data.observatoryList];
      const currentObservatory = observatoryList.filter(observatory => observatory.obsUniqueId === currentObservatoryId)[0];

      dispatch( observatoryListSuccess( observatoryList ) );
      dispatch( fetchMoonPhase(currentObservatory) );
      dispatch( fetchSmallSatelliteView(currentObservatory) );
    })
    .catch(error => dispatch( observatoryListError(error) ))
  };
}



export function observatoryListSuccess(observatoryList) {
  return {
    type: OBSERVATORY_REQUEST_SUCCESS,
    observatoryList
  };
}

export function observatoryListError(observatoryListError) {
  return {
    type: OBSERVATORY_REQUEST_FAIL,
    observatoryListError: true,
    error: observatoryListError
  };
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
    .then(result => dispatch( setMoonPhaseWidget(result.data) ) );
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
    .then(result => dispatch(setSatelliteViewWidget(result.data)));
  };
}

export function setMoonPhaseWidget(moonPhaseWidgetResult) {
  return {
    type: MOON_PHASE_WIDGET_SUCCESS,
    moonPhaseWidgetResult
  };
}

export function setSatelliteViewWidget(satelliteViewWidgetResult)  {
  return {
    type: SATELLITE_VIEW_WIDGET_RESULT,
    satelliteViewWidgetResult
  };
}


export default createReducer(initialState, {
  [OBSERVATORY_REQUEST_SUCCESS](state, { observatoryList }) {
    return {
      ...state,
      observatoryList: observatoryList
    };
  },
  [OBSERVATORY_REQUEST_FAIL](state, error) {
    return {
      ...state,
      observatoryListError: error
    };
  },
  [MOON_PHASE_WIDGET_SUCCESS](state, { moonPhaseWidgetResult }) {
    return {
      ...state,
      moonPhaseWidgetResult
    };
  },
  [SATELLITE_VIEW_WIDGET_RESULT](state, { satelliteViewWidgetResult }) {
    return {
      ...state,
      satelliteViewWidgetResult
    };
  }
});
