import createReducer from '../utils/createReducer';

import {
  FETCH_ASTRONOMER_QUESTION_LIST_START,
  FETCH_ASTRONOMER_QUESTION_LIST_SUCCESS,
  FETCH_ASTRONOMER_QUESTION_LIST_FAIL,
} from './actions';

const initialState = {
  error: false,
  fetching: false,
  page: 0,
  threadCount: 0,
  count: 5,
  threads: [],
};

export default createReducer(initialState, {
  [FETCH_ASTRONOMER_QUESTION_LIST_START](state, { payload }) {
    const { appendToList } = payload;
    return {
      ...state,
      threads: appendToList ? state.threads : [],
      fetching: true,
    };
  },
  [FETCH_ASTRONOMER_QUESTION_LIST_SUCCESS](state, { payload }) {
    const {
      threads,
      threadCount,
      page,
      appendToList
    } = payload;
    const questions = appendToList ? [].concat(state.threads, threads) : threads;

    return {
      ...state,
      fetching: false,
      threadCount,
      page,
      threads: questions,
    };
  },
  [FETCH_ASTRONOMER_QUESTION_LIST_FAIL](state) {
    return {
      ...state,
      fetching: false,
      error: true,
      threads: [],
      threadCount: 0,
      page: 0,
    };
  },
});
