import createReducer from '../../../utils/createReducer';

import {
  FETCH_ASTRONOMER_QUESTIONS_START,
  FETCH_ASTRONOMER_QUESTIONS_SUCCESS,
  FETCH_ASTRONOMER_QUESTIONS_FAIL,
  ASK_QUESTION_START,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_FAIL,
  CHANGE_ANSWER_STATE,
} from './actions';
import { SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_SUCCESS } from '../ask-astronomer-answers/actions';

const initialState = {
  error: false,
  canAnswerQuestions: false,
  canReplyToAnswers: false,
  fetching: false,
  page: 1,
  threadCount: 0,
  count: 5,
  threadList: [],
  questionFilter: 'all',
};

export default createReducer(initialState, {
  [FETCH_ASTRONOMER_QUESTIONS_START](state, { payload }) {
    const { appendToList, threadCount } = payload;
    // console.log(state.threadList);
    return {
      ...state,
      threadList: appendToList ? state.threadList : [],
      threadCount: appendToList && threadCount ? threadCount : 0,
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
      answerState,
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
      questionFilter: answerState,
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
  [ASK_QUESTION_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [ASK_QUESTION_SUCCESS](state, { payload }) {
    const { thread } = payload;
    thread.creationDate = thread.modified;
    const threadList = [].concat(state.threadList);
    threadList.unshift(thread);
    return {
      ...state,
      fetching: false,
      threadCount: state.threadCount + 1,
      threadList,
    };
  },
  [ASK_QUESTION_FAIL](state) {
    return {
      ...state,
    };
  },
  [SUBMIT_ANSWER_FOR_ASTRONOMER_QUESTION_SUCCESS](state, { payload }) {
    const { threadList } = state;
    const { threadId } = payload;
    let newThreadList = [].concat(threadList);
    // when a user submits a new answer, we need to update the counts on that thread
    newThreadList = newThreadList.map((thread) => {
      if (threadId === thread.threadId) {
        thread.replyToponlyCount += 1;
      }
      return thread;
    });
    return {
      ...state,
      threadList: newThreadList,
    };
  },
  [CHANGE_ANSWER_STATE](state, { payload }) {
    return {
      ...state,
      questionFilter: payload.answerState,
    };
  },
});
