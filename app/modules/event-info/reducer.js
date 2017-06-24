import createReducer from '../utils/createReducer';
import {
  FETCH_EVENT_INFO_START,
  FETCH_EVENT_INFO_SUCCESS,
  FETCH_EVENT_INFO_FAIL,
} from './actions';

const initialState = {
  fetching: false,
  error: false,
  eventContent: {
    recommends: [],
  },
};

export default createReducer(initialState, {
  [FETCH_EVENT_INFO_START](state) {
    return {
      ...state,
      ...initialState,
      fetching: true,
    };
  },
  [FETCH_EVENT_INFO_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetching: false,
      eventContent: payload,
    };
  },
  [FETCH_EVENT_INFO_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      eventContent: {},
      error: true,
    };
  },
});
