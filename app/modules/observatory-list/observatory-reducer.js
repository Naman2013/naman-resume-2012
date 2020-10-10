import moment from 'moment';
import createReducer from '../utils/createReducer';

import {
  FETCH_LIST_START,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAIL,
  FETCH_QUOTA_START,
  FETCH_QUOTA_SUCCESS,
  FETCH_QUOTA_FAIL,
} from './observatory-actions';

const initialState = {
  fetchingList: false,  
};

export default createReducer(initialState, {  
  [FETCH_LIST_START](state) {
    return {
      ...state,
      ...initialState,
      fetchingList: true,
    };
  },
  [FETCH_LIST_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingList: false,
      obsList: payload,     
    };
  },
  [FETCH_LIST_FAIL](state, { payload }) {
    return {
      ...state,
      fetchingList: false,
      errorOccurred: true,
      errorBody: payload,
    };
  },
  [FETCH_QUOTA_START](state) {
    return {
      ...state,      
      fetchingList: true,
    };
  },
  [FETCH_QUOTA_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetchingList: false,
      missionQuota: payload,     
    };
  },
  [FETCH_QUOTA_FAIL](state, { payload }) {
    return {
      ...state,
      fetchingList: false,
      errorOccurred: true,
      errorBody: payload,
    };
  },
});
