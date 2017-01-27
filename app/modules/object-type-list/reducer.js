import createReducer from '../utils/createReducer';
import {
  FETCH_OBJECT_TYPE_LIST_START,
  FETCH_OBJECT_TYPE_LIST_SUCCESS,
  FETCH_OBJECT_TYPE_LIST_FAIL,
} from './actions';

const initialState = {
  fetching: false,
  objectListResponse: {
    objectTypeList: [],
  },
  error: false,
  errorBody: {},
};

export default createReducer(initialState, {
  [FETCH_OBJECT_TYPE_LIST_START](state) {
    return {
      ...state,
      fetching: true,
      objectListResponse: {
        objectTypeList: [],
      },
      error: false,
      errorBody: {},
    };
  },
  [FETCH_OBJECT_TYPE_LIST_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetching: false,
      objectListResponse: payload,
      error: false,
      errorBody: {},
    };
  },
  [FETCH_OBJECT_TYPE_LIST_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      objectListResponse: {
        objectTypeList: [],
      },
      error: true,
      errorBody: payload,
    };
  },
});
