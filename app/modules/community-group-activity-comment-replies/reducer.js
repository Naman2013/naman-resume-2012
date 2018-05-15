import cloneDeep from 'lodash/cloneDeep';
import take from 'lodash/take';
import createReducer from '../utils/createReducer';

import {
  COMMENT_REPLY_UPDATE_SUBMITTED,
  FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_FAIL,
  FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_START,
  FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_SUCCESS,
  REPLY_TO_ACTIVITY_COMMENT_FAIL,
  REPLY_TO_ACTIVITY_COMMENT_START,
  REPLY_TO_ACTIVITY_COMMENT_SUCCESS,
  TOGGLE_ALL_GROUP_ACTIVITY_COMMENT_REPLIES,
  UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_REPLIES_DISPLAY_LIST,
} from './actions';

const initialState = {
  fetchingObj: {},
  error: false,
  paginationCount: 5,
  resultsCount: 0,
  allReplies: {},
  allDisplayedReplies: {},
  submitId: 0,
  submitErrorId: 0,
  submitted: {},
};

export default createReducer(initialState, {
  [FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_START](state, { payload }) {
    const { replyId } = payload;
    const newFetching = cloneDeep(state.fetchingObj);
    newFetching[replyId] = true;
    return {
      ...state,
      fetchingObj: newFetching,
    };
  },
  [FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_SUCCESS](state, { payload }) {
    const { replies, replyId, resultsCount } = payload;
    const newAllReplies = cloneDeep(state.allReplies);
    const newAllDisplayedReplies = cloneDeep(state.allDisplayedReplies);
    const newFetching = cloneDeep(state.fetchingObj);
    newAllReplies[replyId] = {
      replies,
      showAllComments: true, // always display on fetch
      page: 1,
    };
    newAllDisplayedReplies[replyId] = (replies && replies.length > 0) ?
      take(replies, state.paginationCount)
        .map(reply => reply.replyId) :
      [];

    newFetching[replyId] = false;
    return {
      ...state,
      fetchingObj: newFetching,
      allReplies: newAllReplies,
      allDisplayedReplies: newAllDisplayedReplies,
      resultsCount,
    };
  },
  [FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_FAIL](state, { payload }) {
    const { replyId } = payload;
    const newFetching = cloneDeep(state.fetchingObj);
    newFetching[replyId] = false;
    return {
      ...state,
      fetchingObj: newFetching,
      error: true,
      allReplies: {},
      allDisplayedReplies: {},
      resultsCount: 0,
    };
  },
  [UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_REPLIES_DISPLAY_LIST](state, { payload }) {
    const {
      page,
      replyId,
      displayedComments,
    } = payload;
    const newDisplayedState = cloneDeep(state.allDisplayedReplies);
    const newAllState = cloneDeep(state.allReplies);
    newDisplayedState[replyId] = displayedComments;
    if (newAllState[replyId]) {
      newAllState[replyId].page = page;
    }

    return {
      ...state,
      allReplies: newAllState,
      allDisplayedReplies: newDisplayedState,
    };
  },
  [REPLY_TO_ACTIVITY_COMMENT_START](state, { payload }) {
    const { replyTo } = payload;
    return {
      ...state,
      submitId: replyTo,
      submitErrorId: 0,
    };
  },
  [REPLY_TO_ACTIVITY_COMMENT_SUCCESS](state, { payload }) {
    const { replyId, reply } = payload;
    const newAllReplies = cloneDeep(state.allReplies);
    const newAllDisplayedReplies = cloneDeep(state.allDisplayedReplies);
    const lastPage = Math.ceil((newAllReplies[replyId] && newAllReplies[replyId].replies.length) / state.paginationCount)
    if (payload.apiError === false && newAllReplies[replyId] && newAllReplies[replyId].replies) {
       newAllReplies[replyId].replies = [].concat(newAllReplies[replyId].replies, Object.assign({ likesCount: 0}, reply));
    }
    if (newAllReplies[replyId] && (newAllReplies[replyId].page === lastPage) && newAllDisplayedReplies[replyId]) {
       newAllDisplayedReplies[replyId] = [].concat(newAllDisplayedReplies[replyId], reply.replyId)
    }

    return {
      ...state,
      submitId: 0,
      allReplies: newAllReplies,
      allDisplayedReplies: newAllDisplayedReplies,
    };
  },
  [REPLY_TO_ACTIVITY_COMMENT_FAIL](state, { payload }) {
    const { replyTo } = payload;
    return {
      ...state,
      submitId: 0,
      submitErrorId: replyTo,
    };
  },
  [COMMENT_REPLY_UPDATE_SUBMITTED](state, { payload }) {
    const { submitted, replyTo } = payload;
    const newSubmitted = cloneDeep(state.submitted);
    newSubmitted[replyTo] = submitted;
    return {
      ...state,
      submitted: newSubmitted,
    };
  },
  [TOGGLE_ALL_GROUP_ACTIVITY_COMMENT_REPLIES](state, { payload }) {
    const { replyId, showAllComments } = payload;
    const newAllReplies = cloneDeep(state.allReplies);
    if (newAllReplies[replyId]) {
      newAllReplies[replyId].showAllComments = showAllComments;
    }
    return {
      ...state,
      allReplies: newAllReplies,
    };
  },
});
