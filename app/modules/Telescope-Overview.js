import createReducer from './utils/createReducer';
import axios from 'axios';

export const OBSERVATORY_REQUEST_SUCCESS = 'OBSERVATORY_REQUEST_SUCCESS';
export const OBSERVATORY_REQUEST_FAIL = 'OBSERVATORY_REQUEST_FAIL';
export const CHANGE_TELESCOPE_OVERVIEW = 'CHANGE_TELESCOPE_OVERVIEW';

const initialState = {
  observatoryList: [],
  observatoryListError: false,
  currentObservatory: {},
  loadingObservatory: true
};

export function getObservatoryList(user, observatoryId = '') {
  return dispatch => {
    return axios.post('/api/obs/list', {
      lang: 'en',
      status: 'live',
      at: user.at,
      cid: user.cid,
      token: user.token,
      listType: 'pageHeader'
    })
    .then(response => dispatch( observatoryListSuccess( response ) ))
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

export function changeTelescopeOverview(observatoryDetails) {
  return {
    type: CHANGE_TELESCOPE_OVERVIEW,
    observatoryDetails
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
      currentObservatory: observatoryDetails,
      loadingObservatory: false
    }
  }
});
