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
  TOGGLE_ALL_ASK_ASTRONOMER_ANSWER_REPLIES,
  UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_REPLIES_DISPLAY_LIST,
} from './actions';

const initialState = {
  fetchingObj: {},
  error: false,
  paginationCount: 5,
  resultsCount: 0,
  allReplies: {},
  allDisplayedReplies: {},
  allReplySubmissions: {},
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
    const newAllDisplayedReplies = cloneDeep(state.allDisplayedReplies);
    const newFetching = cloneDeep(state.fetchingObj);
    newAllReplies[replyTo] = {
      replies,
      showAllReplies: false,
      page: 1,
    };
    newAllDisplayedReplies[replyTo] = (replies && replies.length > 0) ?
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
      allDisplayedReplies: newAllDisplayedReplies,
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
    const newAllReplySubmissions = cloneDeep(state.allReplySubmissions);
    newAllReplySubmissions[replyTo] = {
      submitting: true,
      submitted: false,
    };
    return {
      ...state,
      allReplySubmissions: newAllReplySubmissions,
    };
  },
  [REPLY_TO_ASTRONOMER_ANSWER_SUCCESS](state, { payload }) {
    const { replyTo, reply } = payload; // replyTo is the replyId of the answer that the user replied to
    const { paginationCount } = state;
    // first change submission model
    const newAllReplySubmissions = cloneDeep(state.allReplySubmissions);
    newAllReplySubmissions[replyTo] = {
      submitting: false,
      submitted: true,
    };

    // now we want to add the new reply to the list of replies on an answer
    const newAllReplies = cloneDeep(state.allReplies);
    const newAllDisplayedReplies = cloneDeep(state.allDisplayedReplies);
    newAllDisplayedReplies[replyTo] = newAllDisplayedReplies[replyTo] || [];
    if (newAllReplies[replyTo] && newAllReplies[replyTo].replies) {
       newAllReplies[replyTo].replies = [].concat(newAllReplies[replyTo].replies, Object.assign({ likesCount: 0 }, reply));
    }

    if (newAllReplies[replyTo].showAllReplies) {
       newAllDisplayedReplies[replyTo] = [].concat(newAllDisplayedReplies[replyTo], reply.replyId);

       // add the new submission to the displayedReplies array
       // but only add it if the last page is the currently displayed page.
       if (newAllReplies[replyTo].showAllReplies) {
         const lastPage = (Math.ceil(newAllReplies[replyTo].replies.length / paginationCount)) || 1;
         if (newAllReplies[replyTo].page === lastPage) {
           newAllDisplayedReplies[replyTo] = newAllDisplayedReplies[replyTo] || [];
           newAllDisplayedReplies[replyTo] = [].concat(newAllDisplayedReplies[replyTo], reply.replyId);
         }
       }
    } else {
      // make sure we always open the replies when a new reply is submitted
      newAllReplies[replyTo].showAllReplies = true;
      // show first X answers
      newAllDisplayedReplies[replyTo] = take(newAllReplies[replyTo].replies, paginationCount).map(rep => rep.replyId);
    }

    return {
      ...state,
      allReplies: newAllReplies,
      allDisplayedReplies: newAllDisplayedReplies,
      allReplySubmissions: newAllReplySubmissions,
    };
  },
  [REPLY_TO_ASTRONOMER_ANSWER_FAIL](state, { payload }) {
    const { replyTo } = payload;
    const newAllReplySubmissions = cloneDeep(state.allReplySubmissions);
    newAllReplySubmissions[replyTo] = {
      submitting: false,
      submitted: false,
    };
    return {
      ...state,
      allReplySubmissions: newAllReplySubmissions,
    };
  },
  [ASTRONOMER_REPLY_UPDATE_SUBMITTED](state, { payload }) {
    const { submitted, replyTo } = payload;
    const newSubmitted = cloneDeep(state.submitted);
    newSubmitted[replyTo] = submitted;
    return {
      ...state,
      submitted: newSubmitted,
    };
  },
});
