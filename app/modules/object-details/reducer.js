import clone from 'lodash/clone';
import createReducer from '../utils/createReducer';

import {
  FETCH_OBJECT_DATA,
  FETCH_OBJECT_DATA_START,
  FETCH_OBJECT_DATA_SUCCESS,
  FETCH_OBJECT_DATA_FAIL,
  } from './actions';

const initialState = {

};

export default createReducer(initialState, {
  [FETCH_OBJECT_DATA_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
  [FETCH_OBJECT_DATA_START](state) {
    return {
      ...state,
    };
  },
  [FETCH_OBJECT_DATA_FAIL](state, { payload }) {
    return {
      ...state,
      errorBody: payload,
    };
  },
});
