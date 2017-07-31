import createReducer from '../utils/createReducer';
import axios from 'axios';
import { setTag } from '../../services/tags/set-tag';

const SET_TAGS_START = 'SET_TAGS_START';
const SET_TAGS_SUCCESS = 'SET_TAGS_SUCCESS';
const SET_TAGS_FAIL = 'SET_TAGS_FAIL';
const GET_TAGS_START = 'GET_TAGS_START';
const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
const GET_TAGS_FAIL = 'GET_TAGS_FAIL';

const RESET_CLIENT_TAG_DATA = 'RESET_CLIENT_TAG_DATA';

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

const getTagsSuccess = result => ({
  type: GET_TAGS_SUCCESS,
  payload: result,
});

const getTagsFail = error => ({
  type: GET_TAGS_FAIL,
  payload: error,
});

const startGetTag = () => ({
  type: GET_TAGS_START,
});

/**
  delete tags
  /api/tags/deleteTag
  see: https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/
*/
export const deleteTag = tagData => (dispatch, getState) => {
  const { token, at, cid } = getState().user;

  startSetTag();

  return axios.post('/api/tags/deleteTag', {
    token,
    at,
    cid,
    ...tagData,
  })
  .then(result => dispatch(setTagsSuccess(result.data)))
  .catch(error => dispatch(setTagsFail(error)));
};


/**
  set tags
  /api/tags/setTag
  see: https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/
*/
export function setTags(tagData) {
  return function setTagsAction(dispatch, getState) {
    const { token, at, cid } = getState().user;
    dispatch(startSetTag());

    return setTag({
      // at: 3, // for testing purposes
      // cid: 185651, // for testing purposes
      // token: 'ff278b57d3724d41a3d48194e2f29526b30e9c0f', // for testing purposes
      // customerId: 185651,// for testing purposes
      token,
      at,
      cid,
      customerId: cid,
      ...tagData,
    })
    .then((result) => {

      if (result.data.apiError) {
        dispatch(setTagsFail(result.data));
      } else {
        dispatch(setTagsSuccess(result.data));
      }
    })
    .catch(error => dispatch(setTagsFail(error)));
  };
}

/**
  get tags
  /api/tags/getTag
  see: https://docs.google.com/document/d/1nYo6_O87gWCqyoD3NJ98cbA5Cpxo-8ksB3Dw3PbjAa0/
*/
export function getTags(tagData) {
  return function setTagsAction(dispatch, getState) {
    const { token, at, cid } = getState().user;
    dispatch(startGetTag());

    return axios.post('/api/tags/getTags', {
      // at: 3, // for testing purposes
      // cid: 185651, // for testing purposes
      // token: 'ff278b57d3724d41a3d48194e2f29526b30e9c0f', // for testing purposes
      // customerId: 185651,// for testing purposes
      token,
      at,
      cid,
      customerId: cid,
      ...tagData,
    })
    .then(result => dispatch(getTagsSuccess(result.data)))
    .catch(error => dispatch(getTagsFail(error)));
  };
}

export const resetClientTagData = () => ({
  type: RESET_CLIENT_TAG_DATA,
});

const generateInitialState = () => ({
  tags: null,
  settingError: false,
  settingTag: false,
  previousSetTagError: null,
  fetching: false,
});

export default createReducer(generateInitialState(), {
  [SET_TAGS_START](state) {
    return {
      ...state,
      settingError: false,
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
      settingError: true,
      previousSetTagError: payload,
    }
  },
  [GET_TAGS_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [GET_TAGS_SUCCESS](state, { payload }) {
    return {
      ...state,
      tags: payload,
      fetching: false,
    };
  },
  [GET_TAGS_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
    }
  },
  [RESET_CLIENT_TAG_DATA](state) {
    return {
      ...state,
      ...generateInitialState(),
    };
  }
});
