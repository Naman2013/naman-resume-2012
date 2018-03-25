import cloneDeep from 'lodash/cloneDeep';
import createReducer from '../utils/createReducer';
import {
  FETCH_ASTRONOMER_ANSWERS_START,
  FETCH_ASTRONOMER_ANSWERS_SUCCESS,
  FETCH_ASTRONOMER_ANSWERS_FAIL,
  TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS,
  UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST,
} from './actions';

import {
  REPLY_TO_ASTRONOMER_ANSWER_SUCCESS,
  TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES,
  TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES,
} from '../ask-astronomer-answer-discuss/actions';

const initialState = {
  fetching: false,
  page: 0,
  error: false,
  resultsCount: 0,
  paginationCount: 2,
  allAnswers: {},
  allDisplayedAnswers: {},
};

export default createReducer(initialState, {
  [FETCH_ASTRONOMER_ANSWERS_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_ASTRONOMER_ANSWERS_SUCCESS](state, { payload }) {
    const { replies, threadId, resultsCount } = payload;
    const newAllAnswers = cloneDeep(state.allAnswers);
    const newAllDisplayedAnswers = cloneDeep(state.allDisplayedAnswers);
    newAllAnswers[threadId] = {
      replies,
      page: 1,
      showAllAnswers: false,
      topAnswer: replies.length > 0 ? replies[0].replyId : null,
    };
    newAllDisplayedAnswers[threadId] = replies.length > 0 ? [replies[0].replyId] : [];

    return {
      ...state,
      fetching: false,
      allAnswers: newAllAnswers,
      allDisplayedAnswers: newAllDisplayedAnswers,
      resultsCount,
    };
  },
  [FETCH_ASTRONOMER_ANSWERS_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
      allAnswers: {},
      allDisplayedAnswers: {},
      resultsCount: 0,
      page: 0,
    };
  },
  [TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS](state, { payload }) {
    const { threadId, showAllReplies } = payload;
    const newAllAnswers = cloneDeep(state.allAnswers);

    if (newAllAnswers[threadId]) {
      newAllAnswers[threadId].showAllAnswers = payload.showAllAnswers;
    }
    return {
      ...state,
      allAnswers: newAllAnswers,
    };
  },
  [UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST](state, { payload }) {
    const {
      page,
      threadId,
      displayedAnswers,
    } = payload;

    const newState = cloneDeep(state.allDisplayedAnswers);
    const newAllState = cloneDeep(state.allAnswers);
    newState[threadId] = displayedAnswers;
    if (newAllState[threadId]) {
      newAllState[threadId].page = page
    }
    return {
      ...state,
      page,
      allAnswers: newAllState,
      allDisplayedAnswers: newState,
    };
  },
  [REPLY_TO_ASTRONOMER_ANSWER_SUCCESS](state, { payload }) {
    const {
      threadId,
      replyTo,
    } = payload;

    const newAllState = cloneDeep(state.allAnswers);

    if (newAllState[threadId] && newAllState[threadId].replies) {
      newAllState[threadId].replies = newAllState[threadId].replies.map(answer => {
        if (answer.replyId === replyTo) {
          answer.replyCount++;
        }
        return answer;
      });
    }

    return {
      ...state,
      allAnswers: newAllState,
    };
  },
  [TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES](state, { payload }) {
    const { threadId, replyTo } = payload;
    const newAllAnswers = cloneDeep(state.allAnswers);

    if (newAllAnswers[threadId] && newAllAnswers[threadId].replies) {
      newAllAnswers[threadId].replies = newAllAnswers[threadId].replies.map(answer => {
        if (answer.replyId === replyTo) {
          answer.showAllReplies = payload.showAllReplies;
        }
        return answer;
      });
    }

    return {
      ...state,
      allAnswers: newAllAnswers,
    };
  },
  [TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES](state, { payload }) {
    const { threadId, replyTo } = payload;
    const newAllAnswers = cloneDeep(state.allAnswers);

    if (newAllAnswers[threadId] && newAllAnswers[threadId].replies) {
      newAllAnswers[threadId].replies = newAllAnswers[threadId].replies.map(answer => {
        if (answer.replyId === replyTo) {
          answer.showReplies = payload.showReplies;
        }
        return answer;
      });
    }

    return {
      ...state,
      allAnswers: newAllAnswers,
    };
  },
});
