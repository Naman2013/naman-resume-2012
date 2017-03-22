import _ from 'lodash';
import createReducer from '../utils/createReducer';
import {
  FETCH_REPLIES_START,
  FETCH_REPLIES_SUCCESS,
  FETCH_REPLIES_FAIL,
// PREPARE_REPLY_START,
  PREPARE_REPLY_SUCCESS,
  PREPARE_REPLY_FAIL,
  SUBMIT_REPLY_START,
  SUBMIT_REPLY_SUCCESS,
  SUBMIT_REPLY_FAIL,
  RESET_REPLY_STATE,
} from './actions';

const initialState = {
  fetching: false,
  page: 0,
  error: false,
  repliesLists: {},
  postUUID: '',
  replySubmitted: false,
  submitting: false,
  resultsCount: 0,
};

export default createReducer(initialState, {
  [FETCH_REPLIES_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_REPLIES_SUCCESS](state, { payload }) {
    const { replies, threadId, page, resultsCount, appendToList } = payload;
    const newState = _.cloneDeep(state.repliesLists);
    newState[threadId] = (newState[threadId] && appendToList) ?
      newState[threadId].concat(replies) : replies;

    return {
      ...state,
      fetching: false,
      page,
      repliesLists: newState,
      resultsCount,
    };
  },
  [FETCH_REPLIES_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
      repliesLists: {},
      resultsCount: 0,
      page: 0,
    };
  },
  [PREPARE_REPLY_SUCCESS](state, { payload }) {
    const { postUUID } = payload;
    return {
      ...state,
      postUUID,
    };
  },
  [PREPARE_REPLY_FAIL](state, { payload }) {
    return {
      ...state,
      postUUID: '',

    };
  },
  [SUBMIT_REPLY_START](state) {
    return {
      ...state,
      submitting: true,
      replySubmitted: false,
    };
  },
  [SUBMIT_REPLY_SUCCESS](state, { payload }) {
    return {
      ...state,
      submitting: false,
      replySubmitted: true,
    };
  },
  [SUBMIT_REPLY_FAIL](state, { payload }) {
    return {
      ...state,
      submitting: false,
      replySubmitted: false,
      error: true,
    };
  },
  [RESET_REPLY_STATE](state, { payload }) {
    return {
      ...state,
      submitting: false,
      replySubmitted: false,
    };
  },
});
