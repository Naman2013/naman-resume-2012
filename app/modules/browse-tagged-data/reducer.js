import clone from 'lodash/clone';
import createReducer from '../utils/createReducer';

import {
  FETCH_BROWSE_TAGGED_DATA,
  FETCH_BROWSE_TAGGED_DATA_START,
  FETCH_BROWSE_TAGGED_DATA_SUCCESS,
  FETCH_BROWSE_TAGGED_DATA_FAIL,

  FETCH_BROWSE_FIND_DATA,
  FETCH_BROWSE_FIND_DATA_START,
  FETCH_BROWSE_FIND_DATA_SUCCESS,
  FETCH_BROWSE_FIND_DATA_FAIL,

  } from './actions';

const initialState = {
  taggedData: { },
  findInstructionalText: '',
};

export default createReducer(initialState, {
  [FETCH_BROWSE_TAGGED_DATA_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
  [FETCH_BROWSE_TAGGED_DATA_START](state) {
    return {
      ...state,
    };
  },
  [FETCH_BROWSE_TAGGED_DATA_FAIL](state, { payload }) {
    return {
      ...state,
      errorBody: payload,
    };
  },
});
