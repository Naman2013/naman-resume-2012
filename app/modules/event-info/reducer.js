import _ from 'lodash';
import createReducer from '../utils/createReducer';
import {
  FETCH_EVENT_INFO_START,
  FETCH_EVENT_INFO_SUCCESS,
  FETCH_EVENT_INFO_FAIL,
  LIKE_EVENT_START,
  LIKE_EVENT_SUCCESS,
  LIKE_EVENT_FAIL,
} from './actions';

const initialState = {
  fetching: false,
  error: false,
  eventContent: {}
};

export default createReducer(initialState, {
  [FETCH_EVENT_INFO_START](state) {
    return {
      ...state,
      fetching: true,
      error: false,
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
  [LIKE_EVENT_START](state) {
    return {
      ...state,
      fetching: true,
      error: false,
    };
  },
  [LIKE_EVENT_SUCCESS](state, { payload }) {
    const { count } = payload;
    const newState = _.cloneDeep(state);
    newState.eventContent.likeCount = count;
    return {
      ...newState,
      fetching: false,
    };
  },
  [LIKE_EVENT_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
    };
  },
});
