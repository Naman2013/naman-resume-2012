import cloneDeep from 'lodash/cloneDeep';
import take from 'lodash/take';
import createReducer from '../utils/createReducer';

import {
  ASTRONOMER_REPLY_UPDATE_SUBMITTED,
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
  fetchingObj: {},
  error: false,
  paginationCount: 2,
  resultsCount: 0,
  allReplies: {},
  allDisplayedReplies: {},
  submitId: 0,
  submitErrorId: 0,
  submitted: {},
};

export default createReducer(initialState, {
  [FETCH_ASTRONOMER_ANSWER_REPLIES_START](state, { payload }) {
    const { replyTo } = payload;
    const newFetching = cloneDeep(state.fetchingObj);
    newFetching[replyTo] = true;
    return {
      ...state,
      fetchingObj: newFetching,
    };
  },
  [FETCH_ASTRONOMER_ANSWER_REPLIES_SUCCESS](state, { payload }) {
    const { replies, replyTo, resultsCount, showOnlyTopReply } = payload;
    const newAllReplies = cloneDeep(state.allReplies);
    const newAllDisplayedAnswers = cloneDeep(state.allDisplayedReplies);
    const newFetching = cloneDeep(state.fetchingObj);
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

    newFetching[replyTo] = false;
    return {
      ...state,
      fetchingObj: newFetching,
      allReplies: newAllReplies,
      allDisplayedReplies: newAllDisplayedAnswers,
      resultsCount,
    };
  },
  [FETCH_ASTRONOMER_ANSWER_REPLIES_FAIL](state, { payload }) {
    const { replyTo } = payload;
    const newFetching = cloneDeep(state.fetchingObj);
    newFetching[replyTo] = false;
    return {
      ...state,
      fetchingObj: newFetching,
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
    const { replyTo } = payload;
    return {
      ...state,
      submitId: replyTo,
      submitErrorId: 0,
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
      submitId: 0,
      allReplies: newAllReplies,
      allDisplayedAnswers: newAllDisplayedAnswers,
    };
  },
  [REPLY_TO_ASTRONOMER_ANSWER_FAIL](state, { payload }) {
    const { replyTo } = payload;
    return {
      ...state,
      submitId: 0,
      submitErrorId: replyTo,
    };
  },
  [ASTRONOMER_REPLY_UPDATE_SUBMITTED](state, { payload }) {
    const { submitted, replyTo } = payload;
    const newSubmitted = cloneDeep(submitted);
    newSubmitted[replyTo] = submitted;
    return {
      ...state,
      submitted: newSubmitted,
    };
  },
});
