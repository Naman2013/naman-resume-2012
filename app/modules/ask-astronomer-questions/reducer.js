import createReducer from '../utils/createReducer';

import {
  FETCH_ASTRONOMER_QUESTIONS_START,
  FETCH_ASTRONOMER_QUESTIONS_SUCCESS,
  FETCH_ASTRONOMER_QUESTIONS_FAIL,
} from './actions';

const initialState = {
  error: false,
  fetching: false,
  page: 0,
  threadCount: 0,
  count: 2,
  threadList: [],
};

export default createReducer(initialState, {
  [FETCH_ASTRONOMER_QUESTIONS_START](state, { payload }) {
    const { appendToList } = payload;
    return {
      ...state,
      threadList: appendToList ? state.threadList : [],
      fetching: true,
    };
  },
  [FETCH_ASTRONOMER_QUESTIONS_SUCCESS](state, { payload }) {
    const { threads, threadCount, page, appendToList } = payload;
    const threadList = appendToList ? [].concat(state.threadList, threads) : threads;

    return {
      ...state,
      fetching: false,
      threadCount,
      page,
      threadList,
    };
  },
  [FETCH_ASTRONOMER_QUESTIONS_FAIL](state) {
    return {
      ...state,
      fetching: false,
      error: true,
      threadList: [],
      threadCount: 0,
      page: 0,
    };
  },
});
