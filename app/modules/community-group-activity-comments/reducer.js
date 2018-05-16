import cloneDeep from 'lodash/cloneDeep';
import take from 'lodash/take';
import createReducer from '../utils/createReducer';

import {
  ACTIVITY_REPLY_UPDATE_SUBMITTED,
  FETCH_GROUP_ACTIVITY_COMMENTS_FAIL,
  FETCH_GROUP_ACTIVITY_COMMENTS_START,
  FETCH_GROUP_ACTIVITY_COMMENTS_SUCCESS,
  REPLY_TO_ACTIVITY_FAIL,
  REPLY_TO_ACTIVITY_START,
  REPLY_TO_ACTIVITY_SUCCESS,
  TOGGLE_ALL_GROUP_ACTIVITY_COMMENTS,
  UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_DISPLAY_LIST,
} from './actions';

import {
  REPLY_TO_GROUP_COMMENT_SUCCESS,
} from '../community-group-activity-comment-replies/actions';

const initialState = {
  fetchingObj: {},
  error: false,
  paginationCount: 5,
  resultsCount: 0,
  allComments: {},
  allDisplayedComments: {},
  submitId: 0,
  submitErrorId: 0,
  submitted: {},
};

export default createReducer(initialState, {
  [FETCH_GROUP_ACTIVITY_COMMENTS_START](state, { payload }) {
    const { threadId } = payload;
    const newFetching = cloneDeep(state.fetchingObj);
    newFetching[threadId] = true;
    return {
      ...state,
      fetchingObj: newFetching,
    };
  },
  [FETCH_GROUP_ACTIVITY_COMMENTS_SUCCESS](state, { payload }) {
    const { replies, threadId, resultsCount } = payload;
    const newAllComments = cloneDeep(state.allComments);
    const newAllDisplayedComments = cloneDeep(state.allDisplayedComments);
    const newFetching = cloneDeep(state.fetchingObj);
    newAllComments[threadId] = {
      replies,
      showAllComments: true, // always display on fetch
      page: 1,
    };
    newAllDisplayedComments[threadId] = (replies && replies.length > 0) ?
      take(replies, state.paginationCount)
        .map(reply => reply.replyId) :
      [];

    newFetching[threadId] = false;
    return {
      ...state,
      fetchingObj: newFetching,
      allComments: newAllComments,
      allDisplayedComments: newAllDisplayedComments,
      resultsCount,
    };
  },
  [FETCH_GROUP_ACTIVITY_COMMENTS_FAIL](state, { payload }) {
    const { threadId } = payload;
    const newFetching = cloneDeep(state.fetchingObj);
    newFetching[threadId] = false;
    return {
      ...state,
      fetchingObj: newFetching,
      error: true,
      allComments: {},
      allDisplayedComments: {},
      resultsCount: 0,
    };
  },
  [UPDATE_TOGGLE_GROUP_ACTIVITY_COMMENT_DISPLAY_LIST](state, { payload }) {
    const {
      page,
      threadId,
      displayedComments,
    } = payload;
    const newDisplayedState = cloneDeep(state.allDisplayedComments);
    const newAllState = cloneDeep(state.allComments);
    newDisplayedState[threadId] = displayedComments;
    if (newAllState[threadId]) {
      newAllState[threadId].page = page;
    }

    return {
      ...state,
      allComments: newAllState,
      allDisplayedComments: newDisplayedState,
    };
  },
  [REPLY_TO_ACTIVITY_START](state, { payload }) {
    const { replyTo } = payload;
    return {
      ...state,
      submitId: replyTo,
      submitErrorId: 0,
    };
  },
  [REPLY_TO_ACTIVITY_SUCCESS](state, { payload }) {
    const { threadId, reply } = payload;
    const newAllComments = cloneDeep(state.allComments);
    const newAllDisplayedComments = cloneDeep(state.allDisplayedComments);

    if (payload.apiError === false && newAllComments[threadId] && newAllComments[threadId].replies) {
       newAllComments[threadId].replies = [].concat(newAllComments[threadId].replies, Object.assign({ likesCount: 0 }, reply));
    }

    const lastPage = (Math.ceil((newAllComments[threadId] && newAllComments[threadId].replies.length) / state.paginationCount)) || 1;
    if (newAllComments[threadId] && (newAllComments[threadId].page === lastPage) && newAllDisplayedComments[threadId]) {
       newAllDisplayedComments[threadId] = [].concat(newAllDisplayedComments[threadId], reply.replyId)
    } else if (newAllComments[threadId] && (newAllComments[threadId].page === lastPage) && !newAllDisplayedComments[threadId]) {
      newAllDisplayedComments[threadId] = [].concat(reply.replyId);
    }

    return {
      ...state,
      submitId: 0,
      allComments: newAllComments,
      allDisplayedComments: newAllDisplayedComments,
    };
  },
  [REPLY_TO_ACTIVITY_FAIL](state, { payload }) {
    const { replyTo } = payload;
    return {
      ...state,
      submitId: 0,
      submitErrorId: replyTo,
    };
  },
  [ACTIVITY_REPLY_UPDATE_SUBMITTED](state, { payload }) {
    const { submitted, replyTo } = payload;
    const newSubmitted = cloneDeep(state.submitted);
    newSubmitted[replyTo] = submitted;
    return {
      ...state,
      submitted: newSubmitted,
    };
  },
  [TOGGLE_ALL_GROUP_ACTIVITY_COMMENTS](state, { payload }) {
    const { threadId, showAllComments } = payload;
    const newAllComments = cloneDeep(state.allComments);
    if (newAllComments[threadId]) {
      newAllComments[threadId].showAllComments = showAllComments;
    }
    return {
      ...state,
      allComments: newAllComments,
    };
  },

  [REPLY_TO_GROUP_COMMENT_SUCCESS](state, { payload }) {
    const { threadId, replyTo } = payload;
    const newAllComments = cloneDeep(state.allComments);
    if (newAllComments[threadId] && newAllComments[threadId].replies) {
     newAllComments[threadId].replies.map((reply) => {
       if (reply.replyId === replyTo) {
         reply.replyCount++;
       }
       return reply;
     })
    }

    return {
      ...state,
      allComments: newAllComments,
    };
  },
});
