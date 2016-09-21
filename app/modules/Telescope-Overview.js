import createReducer from './utils/createReducer';
import axios from 'axios';

export const OBSERVATORY_REQUEST_SUCCESS = 'OBSERVATORY_REQUEST_SUCCESS';
export const OBSERVATORY_REQUEST_FAIL = 'OBSERVATORY_REQUEST_FAIL';

const initialState = {
  observatoryList: [],
  observatoryListError: false
};

export function getObservatoryList(user, observatoryId = '') {
  console.log('user from observatory request');
  console.log(user);
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


// action creator
export function observatoryListSuccess(observatoryList) {
  return {
    type: OBSERVATORY_REQUEST_SUCCESS,
    observatoryList: observatoryList.data.observatoryList
  };
}

export function observatoryListError(observatoryListError) {
  console.log('ERROR------');
  console.log(observatoryListError);
  return {
    type: OBSERVATORY_REQUEST_FAIL,
    observatoryListError: true
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
  }
});
