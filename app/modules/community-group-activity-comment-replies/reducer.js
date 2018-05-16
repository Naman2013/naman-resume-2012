import cloneDeep from 'lodash/cloneDeep';
import take from 'lodash/take';
import createReducer from '../utils/createReducer';

import {
  COMMENT_REPLY_UPDATE_SUBMITTED,
  FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_FAIL,
  FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_START,
  FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_SUCCESS,
  REPLY_TO_GROUP_COMMENT_FAIL,
  REPLY_TO_GROUP_COMMENT_START,
  REPLY_TO_GROUP_COMMENT_SUCCESS,
  TOGGLE_ALL_GROUP_COMMENT_REPLIES,
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
    const { replyTo } = payload;
    const newFetching = cloneDeep(state.fetchingObj);
    newFetching[replyTo] = true;
    return {
      ...state,
      fetchingObj: newFetching,
    };
  },
  [FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_SUCCESS](state, { payload }) {
    const { replies, replyTo, resultsCount } = payload;
    const newAllReplies = cloneDeep(state.allReplies);
    const newAllDisplayedReplies = cloneDeep(state.allDisplayedReplies);
    const newFetching = cloneDeep(state.fetchingObj);
    newAllReplies[replyTo] = {
      replies,
      showAllReplies: true, // always display on fetch
      page: 1,
    };
    newAllDisplayedReplies[replyTo] = (replies && replies.length > 0) ?
      take(replies, state.paginationCount)
        .map(reply => reply.replyId) :
      [];

    newFetching[replyTo] = false;
    return {
      ...state,
      fetchingObj: newFetching,
      allReplies: newAllReplies,
      allDisplayedReplies: newAllDisplayedReplies,
      resultsCount,
    };
  },
  [FETCH_GROUP_ACTIVITY_COMMENT_REPLIES_FAIL](state, { payload }) {
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
  [UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_REPLIES_DISPLAY_LIST](state, { payload }) {
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
  [REPLY_TO_GROUP_COMMENT_START](state, { payload }) {
    const { replyTo } = payload;
    return {
      ...state,
      submitId: replyTo,
      submitErrorId: 0,
    };
  },
  [REPLY_TO_GROUP_COMMENT_SUCCESS](state, { payload }) {
    const { replyTo, reply } = payload;
    const newAllReplies = cloneDeep(state.allReplies);
    const newAllDisplayedReplies = cloneDeep(state.allDisplayedReplies);

    if (payload.apiError === false && newAllReplies[replyTo] && newAllReplies[replyTo].replies) {
       newAllReplies[replyTo].replies = [].concat(newAllReplies[replyTo].replies, Object.assign({ likesCount: 0 }, reply));
    }

    const lastPage = (Math.ceil((newAllReplies[replyTo] && newAllReplies[replyTo].replies.length) / state.paginationCount)) || 1;
    if (newAllReplies[replyTo] && (newAllReplies[replyTo].page === lastPage) && newAllDisplayedReplies[replyTo]) {
       newAllDisplayedReplies[replyTo] = [].concat(newAllDisplayedReplies[replyTo], reply.replyId)
    } else if (newAllReplies[replyTo] && (newAllReplies[replyTo].page === lastPage) && !newAllDisplayedReplies[replyTo]) {
      newAllDisplayedReplies[replyTo] = [].concat(reply.replyId)
    }

    return {
      ...state,
      submitId: 0,
      allReplies: newAllReplies,
      allDisplayedReplies: newAllDisplayedReplies,
    };
  },
  [REPLY_TO_GROUP_COMMENT_FAIL](state, { payload }) {
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
  [TOGGLE_ALL_GROUP_COMMENT_REPLIES](state, { payload }) {
    const { replyTo, showAllReplies } = payload;
    const newAllReplies = cloneDeep(state.allReplies);

    if (newAllReplies[replyTo]) {
      newAllReplies[replyTo].showAllReplies = showAllReplies;
    }
    return {
      ...state,
      allReplies: newAllReplies,
    };
  },
});
