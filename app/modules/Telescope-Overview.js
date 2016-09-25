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

export const getCurrentObservatory = (observatoryList, observatoryId) => {
  return observatoryList
    .filter(observatory => observatory.obsUniqueId === observatoryId)[0];
}

const getCurrentTimeInSeconds = () => new Date().getTime() / 1000;

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
      const currentObservatory = getCurrentObservatory( observatoryList, currentObservatoryId );

      dispatch( observatoryListSuccess(observatoryList) );
      dispatch( fetchAllWidgetsByObservatory(currentObservatory) );
    })
    .catch(error => dispatch( observatoryListError(error) ))
  };


export const fetchAllWidgetsByObservatory = ( observatory ) => ( dispatch ) => {
  dispatch( fetchMoonPhase(observatory) );
  dispatch( fetchSmallSatelliteView(observatory) );
};


export const observatoryListSuccess = ( observatoryList ) => ({
  type: OBSERVATORY_REQUEST_SUCCESS,
  observatoryList
});



export const observatoryListError = ( observatoryListError ) => ({
  type: OBSERVATORY_REQUEST_FAIL,
  observatoryListError: true,
  error: observatoryListError
});



const fetchMoonPhase = ( observatory ) => ( dispatch ) => {
  return axios.post('/api/moon/phase', {
    ver: 'v1',
    lang: 'en',
    obsId: observatory.obsId,
    widgetUniqueId: observatory.MoonPhaseWidgetId,
    timestamp: getCurrentTimeInSeconds()
  })
  .then(result => dispatch( setMoonPhaseWidget(result.data) ) );
};



const fetchSmallSatelliteView = ( observatory ) => ( dispatch ) => {
  return axios.post('/api/wx/satellite', {
    ver: 'v1',
    lang: 'en',
    obsId: observatory.obsId,
    widgetUniqueId: observatory.SatelliteWidgetId,
    timestamp: getCurrentTimeInSeconds()
  })
  .then(result => dispatch(setSatelliteViewWidget(result.data)));
};



const setMoonPhaseWidget = ( moonPhaseWidgetResult ) => ({
    type: MOON_PHASE_WIDGET_SUCCESS,
    moonPhaseWidgetResult
})



export const setSatelliteViewWidget = ( satelliteViewWidgetResult ) => ({
    type: SATELLITE_VIEW_WIDGET_RESULT,
    satelliteViewWidgetResult
});



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
