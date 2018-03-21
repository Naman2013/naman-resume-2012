import cloneDeep from 'lodash/cloneDeep';
import createReducer from '../utils/createReducer';
import {
  FETCH_ASTRONOMER_ANSWER_REPLIES_START,
  FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS,
  FETCH_ASTRONOMER_ANSWER_REPLIES_FAIL,
  REPLY_TO_ASTRONOMER_ANSWER,
  TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES,
  TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES,
  UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES_LIST,
} from './actions';

const initialState = {
  fetching: false,
  page: 0,
  error: false,
  resultsCount: 0,
  allReplies: {},
  allDisplayedReplies: {},
  showAllReplies: false,
  showReplies: false,
};

export default createReducer(initialState, {
  [FETCH_ASTRONOMER_ANSWER_REPLIES_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS](state, { payload }) {
    const { replies, threadId, resultsCount, showOnlyTopReply } = payload;
    const newAllAnswers = cloneDeep(state.allReplies);
    const newAllDisplayedAnswers = cloneDeep(state.allDisplayedReplies);
    newAllAnswers[threadId] = {
      replies,
      page: 1,
      topAnswer: replies.length > 0 ? replies[0].replyId : null,
    };
    newAllDisplayedAnswers[threadId] = replies.length > 0 ? (showOnlyTopReply ? [replies[0]] : replies) : [];

    return {
      ...state,
      fetching: false,
      allReplies: newAllAnswers,
      allDisplayedReplies: newAllDisplayedAnswers,
      resultsCount,
    };
  },
  [FETCH_ASTRONOMER_ANSWER_REPLIES_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
      allReplies: {},
      allDisplayedReplies: {},
      resultsCount: 0,
      page: 0,
    };
  },
  [TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES](state, { payload }) {
    return {
      ...state,
      showAllReplies: payload.showAllReplies,
    };
  },
  [TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES](state, { payload }) {
    return {
      ...state,
      showReplies: payload.showReplies,
    };
  },
  [UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES_LIST](state, { payload }) {
    const {
      page,
      threadId,
      displayedReplies,
    } = payload;

    const newState = cloneDeep(state.allDisplayedReplies);
    newState[threadId] = displayedReplies;

    return {
      ...state,
      page,
      allDisplayedReplies: newState,
    };
  },
});
