import cloneDeep from 'lodash/cloneDeep';
import take from 'lodash/take';
import createReducer from '../utils/createReducer';

import {
  FETCH_ASTRONOMER_ANSWER_REPLIES_FAIL,
  FETCH_ASTRONOMER_ANSWER_REPLIES_START,
  FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS,
  REPLY_TO_ASTRONOMER_ANSWER_FAIL,
  REPLY_TO_ASTRONOMER_ANSWER_START,
  REPLY_TO_ASTRONOMER_ANSWER_SUCCESS,
  REPLY_TO_ASTRONOMER_ANSWER,
  TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES,
  TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES,
  UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES_DISPLAY_LIST,
} from './actions';

const initialState = {
  fetching: false,
  error: false,
  paginationCount: 2,
  resultsCount: 0,
  allReplies: {},
  allDisplayedReplies: {},
  submitting: false,
  submitError: false,
};

export default createReducer(initialState, {
  [FETCH_ASTRONOMER_ANSWER_REPLIES_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS](state, { payload }) {
    const { replies, replyTo, resultsCount, showOnlyTopReply } = payload;
    const newAllReplies = cloneDeep(state.allReplies);
    const newAllDisplayedAnswers = cloneDeep(state.allDisplayedReplies);
    newAllReplies[replyTo] = {
      replies,
      page: 1,
    };
    newAllDisplayedAnswers[replyTo] = (replies && replies.length > 0) ?
      (showOnlyTopReply ?
        [replies[0].replyId] :
        take(replies, state.paginationCount)
          .map(reply => reply.replyId)) :
        [];
    return {
      ...state,
      fetching: false,
      allReplies: newAllReplies,
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
    };
  },
  [UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES_DISPLAY_LIST](state, { payload }) {
    const {
      page,
      replyId,
      displayedReplies,
    } = payload;
    const newDisplayedState = cloneDeep(state.allDisplayedReplies);
    const newAllState = cloneDeep(state.allReplies);
    newDisplayedState[replyId] = displayedReplies;
    if (newAllState[replyId]) {
      newAllState[replyId].page = page;
    }

    return {
      ...state,
      allReplies: newAllState,
      allDisplayedReplies: newDisplayedState,
    };
  },
  [REPLY_TO_ASTRONOMER_ANSWER_START](state, { payload }) {

    return {
      ...state,
      submitting: true,
      submitError: false,
    };
  },
  [REPLY_TO_ASTRONOMER_ANSWER_SUCCESS](state, { payload }) {
    const { replyTo, reply } = payload;
    const newAllReplies = cloneDeep(state.allReplies);
    const newAllDisplayedAnswers = cloneDeep(state.allDisplayedReplies);
    if (payload.apiError === false && newAllReplies[replyTo] && newAllReplies[replyTo].replies) {
       newAllReplies[replyTo].replies = [].concat(newAllReplies[replyTo].replies, Object.assign({ likesCount: 0}, reply));
    }

    if (state.showAllReplies && newAllDisplayedAnswers[replyTo]) {
       newAllDisplayedAnswers[replyTo] = [].concat(newAllDisplayedAnswers[replyTo], reply.replyId)
    }

    return {
      ...state,
      submitting: false,
      allReplies: newAllReplies,
      allDisplayedAnswers: newAllDisplayedAnswers,
    };
  },
  [REPLY_TO_ASTRONOMER_ANSWER_FAIL](state, { payload }) {

    return {
      ...state,
      submitting: false,
      submitError: true,
    };
  },
});
