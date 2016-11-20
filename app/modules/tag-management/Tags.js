import createReducer from '../utils/createReducer';
import axios from 'axios';

const FETCH_TAGS_START = 'FETCH_TAGS_START';
const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
const FETCH_TAGS_FAIL = 'FETCH_TAGS_FAIL';

const SET_TAGS_START = 'SET_TAGS_START';
const SET_TAGS_SUCCESS = 'SET_TAGS_SUCCESS';
const SET_TAGS_FAIL = 'SET_TAGS_FAIL';

/**
  /api/tags/setTag
  see: https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/
*/
export const setTags = ( tagData ) => ( dispatch, getState ) => {
  const { token, at, cid }  = getState().user.user;

  startSetTag();

  return axios.post('/api/tags/setTag', {
    token,
    at,
    cid,
    ...tagData,
  })
  .then( result => dispatch( setTagsSuccess( result.data ) ) )
  .catch( error => dispatch( setTagsFail( error ) ) );
};

const setTagsSuccess = result => ({
  type: SET_TAGS_SUCCESS,
  payload: result,
});

const setTagsFail = error => ({
  type: SET_TAGS_FAIL,
  payload: error,
});

const startSetTag = () => ({
  type: SET_TAGS_START,
});

/**
  /api/tags/getTags
  see: https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/edit#
*/
export const fetchTags = ( tagData ) => ( dispatch, getState ) => {
  const { token, at, cid } = getState().user.user;
  return axios.post('/api/tags/getTags', {
    token,
    at,
    cid,
    ...tagData,
  })
  .then( result => dispatch( fetchTagsSuccess( result.data ) ) )
  .catch( error => dispatch( fetchTagsFail( error ) ) );
};

// actions
const fetchTagsSuccess = payload => ({
  type: FETCH_TAGS_SUCCESS,
  payload,
});

const fetchTagsFail = payload => ({
  type: FETCH_TAGS_FAIL,
  payload,
});



const initialState = {
  isLoading: true,
  isError: false,
  tags: null,
  lastErrorMessage: null,
  settingTag: false,
  previousSetTagError: null,
};

export default createReducer(initialState, {
  [FETCH_TAGS_START](state) {
    return {
      ...state,
      isLoading: true,
      isError: false,
      tags: null,
    };
  },
  [FETCH_TAGS_SUCCESS](state, { payload }) {
    return {
      ...state,
      isLoading: false,
      isError: false,
      tags: payload,
    };
  },
  [FETCH_TAGS_FAIL](state, { payload }) {
    return {
      ...state,
      isLoading: false,
      isError: true,
      lastErrorMessage: payload,
    };
  },
  [SET_TAGS_START](state) {
    return {
      ...state,
      settingTag: true,
    };
  },
  [SET_TAGS_SUCCESS](state, { payload }) {
    return {
      ...state,
      tags: payload,
      settingTag: false,
    };
  },
  [SET_TAGS_FAIL](state, { payload }) {
    return {
      ...state,
      settingTag: false,
      previousSetTagError: payload,
    }
  },
});
