import createReducer from './utils/createReducer';
import axios from 'axios';

const FETCH_TAGS_START = 'FETCH_TAGS_START';
const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
const FETCH_TAGS_FAIL = 'FETCH_TAGS_FAIL';

/**
  /api/tags/getTags
  see: https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/edit#
*/
const fetchTags = ( tagData ) => ( dispatch, getState ) => {
  const { token, at, cid } = getState().user.user;
  return axios.post('/api/tags/getTags', {
    token,
    at,
    cid,
    ...tagData,
  });
};

const initialState = {
  isLoading: true,
  tags: null,
};

export default createReducer(initialState, {
  [FETCH_TAGS_START](state, { payload }) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [FETCH_TAGS_SUCCESS](state, { payload }) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [FETCH_TAGS_FAIL](state, { payload }) {
    return {
      ...state,
      isLoading: true,
    };
  },
});
