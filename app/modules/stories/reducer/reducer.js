import createReducer from '../../utils/createReducer';

import { SUBMIT_STORY_START, SUBMIT_STORY_SUCCESS, SUBMIT_STORY_FAILURE } from '../actions/create';

import {
  SET_CREATE_STORIES_PAGE_MODAL,
  OPEN_CREATE_STORIES_PAGE_MODAL,
  CLOSE_CREATE_STORIES_PAGE_MODAL,
  SET_AND_OPEN_CREATE_STORIES_PAGE_MODAL,
} from '../actions/modal';

import { GET_STORIES, GET_STORIES_SUCCESS, GET_STORIES_ERROR } from '../actions';

import * as createStoryReducer from './create';
import * as modalReducer from './modal';

const initialState = {
  create: {},
  modal: {
    showModal: false,
    modalComponent: null,
    modalStyles: null,
  },
  isFetching: false,
};

export default createReducer(initialState, {
  [SUBMIT_STORY_START]: createStoryReducer.submitStoryStart,
  [SUBMIT_STORY_SUCCESS]: createStoryReducer.submitStorySuccess,
  [SUBMIT_STORY_FAILURE]: createStoryReducer.submitStoryFailure,
  [SET_CREATE_STORIES_PAGE_MODAL]: modalReducer.setModal,
  [OPEN_CREATE_STORIES_PAGE_MODAL]: modalReducer.openModal,
  [SET_AND_OPEN_CREATE_STORIES_PAGE_MODAL]: modalReducer.setAndOpenModal,
  [CLOSE_CREATE_STORIES_PAGE_MODAL]: modalReducer.closeModal,
  [GET_STORIES]: getStoriesStart,
  [GET_STORIES_SUCCESS]: getStoriesSuccess,
  [GET_STORIES_ERROR]: getStoriesError,
});

function getStoriesStart(state = initialState) {
  return {
    ...state,
    isFetching: true,
  };
}

function getStoriesSuccess(state = initialState, { payload }) {
  return {
    ...state,
    isFetching: false,
  };
}

function getStoriesError(state = initialState) {
  return {
    ...state,
    isFetching: false,
  };
}
