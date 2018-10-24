import createReducer from '../utils/createReducer';

import {
  FETCH_ASTRONOMER_QUESTIONS_START,
  FETCH_ASTRONOMER_QUESTIONS_SUCCESS,
  FETCH_ASTRONOMER_QUESTIONS_FAIL,
} from './actions';

const initialState = {
  error: false,
  canAnswerQuestions: false,
  canReplyToAnswers: false,
  fetching: false,
  page: 0,
  threadCount: 0,
  count: 5,
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
    const {
      threads,
      threadCount,
      page,
      appendToList,
      canReplyToAnswers,
      canAnswerQuestions,
    } = payload;
    const threadList = appendToList ? [].concat(state.threadList, threads) : threads;

    return {
      ...state,
      fetching: false,
      threadCount,
      page,
      threadList,
      canAnswerQuestions,
      canReplyToAnswers,
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
      canAnswerQuestions: false,
      canReplyToAnswers: false,
    };
  },
});
