import _ from 'lodash';
import createReducer from '../utils/createReducer';
import {
  FETCH_THREAD_LIST_START,
  FETCH_THREAD_LIST_SUCCESS,
  FETCH_THREAD_LIST_FAIL,
  FETCH_THREAD_START,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_FAIL,
} from './actions';

const initialState = {
  fetching: false,
  threadList: [],
  page: 0,
  threadCount: 0,
  error: false,
  thread: {}
};

export default createReducer(initialState, {
  [FETCH_THREAD_LIST_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_THREAD_LIST_SUCCESS](state, { payload }) {
    const { threads, threadCount, page } = payload;
    return {
      ...state,
      fetching: false,
      threadCount,
      page,
      threadList: state.threadList.concat(threads),
    };
  },
  [FETCH_THREAD_LIST_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
      threadList: [],
      threadCount: 0,
      page: 0,
    };
  },
  [FETCH_THREAD_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_THREAD_SUCCESS](state, { payload }) {
    const { thread } = payload;
    return {
      ...state,
      fetching: false,
      thread,
    };
  },
  [FETCH_THREAD_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
      thread: {},
      page: 0,
    };
  },
});
