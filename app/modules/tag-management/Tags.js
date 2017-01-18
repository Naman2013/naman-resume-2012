import createReducer from '../utils/createReducer';
import axios from 'axios';

const SET_TAGS_START = 'SET_TAGS_START';
const SET_TAGS_SUCCESS = 'SET_TAGS_SUCCESS';
const SET_TAGS_FAIL = 'SET_TAGS_FAIL';

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

    return axios.post('/api/tags/setTag', {
      token,
      at,
      cid,
      customerId: cid,
      ...tagData,
    })
    .then(result => dispatch(setTagsSuccess(result.data)))
    .catch(error => dispatch(setTagsFail(error)));
  };
}

export const resetClientTagData = () => ({
  type: RESET_CLIENT_TAG_DATA,
});

const generateInitialState = () => ({
  isLoading: false,
  tags: null,
  settingTag: false,
  previousSetTagError: null,
});

export default createReducer(generateInitialState(), {
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
  [RESET_CLIENT_TAG_DATA](state) {
    return {
      ...state,
      ...generateInitialState(),
    };
  }
});
