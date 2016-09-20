import createReducer from './utils/createReducer';
import axios from 'axios';

export const OBSERVATORY_REQUEST_SUCCESS = 'OBSERVATORY_REQUEST_SUCCESS';
export const OBSERVATORY_REQUEST_FAIL = 'OBSERVATORY_REQUEST_FAIL';

const initialState = {
  observatoryList: {},
  observatoryListError: false
};

export function getObservatoryList(observatoryId = '') {
  return dispatch => {
    console.log('get observatory list called...');
    return axios.post('/api/obs/list', {
      observatoryId,
      lang: 'en',
      status: 'live',
      at: '2',
      cid: '198265',
      token: '3f0c15c24dd04a8d4f31f4ffba8bcdd71591d235',
      listType: 'pageHeader'
    })
    .then(response => dispatch( observatoryListSuccess( response ) ))
    .catch(error => dispatch( observatoryListError( error ) ))
  };
}



// action creator
export function observatoryListSuccess(observatoryList) {
  console.log('observatory list success called....');
  return {
    type: OBSERVATORY_REQUEST_SUCCESS,
    obseratoryListResponse: observatoryListData
  };
}

export function observatoryListError(state, observatoryListError) {
  console.log('observatory list ERROR called....');
  return {
    type: OBSERVATORY_REQUEST_FAIL,
    observatoryListError: true
  };
}



export default createReducer(initialState, {
  [OBSERVATORY_REQUEST_SUCCESS](state, { observatoryList }) {
    return {
      ...state,
      observatoryList
    };
  },
  [OBSERVATORY_REQUEST_FAIL](state) {
    return {
      ...state,
      observatoryListError: true
    };
  }
});
