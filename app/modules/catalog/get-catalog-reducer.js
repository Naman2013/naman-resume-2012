import createReducer from '../utils/createReducer';
import {
    FETCH_CATALOG_START,
    FETCH_CATALOG_SUCCESS,
    FETCH_CATALOG_FAIL } from './get-catalog-actions';

const initialState = {
  fetching: false,
  catalog: {},
  error: false,
  errorMessage: {},
};

export default createReducer(initialState, {
  [FETCH_CATALOG_START](state) {
    return {
      ...state,
      fetching: true,
      catalog: {},
      error: false,
      errorMessage: {},
    };
  },
  [FETCH_CATALOG_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetching: false,
      catalog: payload,
      error: false,
      errorMessage: {},
    };
  },
  [FETCH_CATALOG_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      catalog: {},
      error: true,
      errorMessage: payload,
    };
  },
});
