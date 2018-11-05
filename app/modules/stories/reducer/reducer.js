import createReducer from '../../utils/createReducer';
import initialState from './initialState';

import {
  SUBMIT_STORY_START,
  SUBMIT_STORY_SUCCESS,
  SUBMIT_STORY_FAILURE,
} from '../actions/create';

import {
  SET_CREATE_STORIES_PAGE_MODAL,
  OPEN_CREATE_STORIES_PAGE_MODAL,
  CLOSE_CREATE_STORIES_PAGE_MODAL,
  SET_AND_OPEN_CREATE_STORIES_PAGE_MODAL,
} from '../actions/modal';


import * as createStoryReducer from './create';
import * as modalReducer from './modal';

export default createReducer(initialState, {
  [SUBMIT_STORY_START]: createStoryReducer.submitStoryStart,
  [SUBMIT_STORY_SUCCESS]: createStoryReducer.submitStorySuccess,
  [SUBMIT_STORY_FAILURE]: createStoryReducer.submitStoryFailure,
  [SET_CREATE_STORIES_PAGE_MODAL]: modalReducer.setModal,
  [OPEN_CREATE_STORIES_PAGE_MODAL]: modalReducer.openModal,
  [SET_AND_OPEN_CREATE_STORIES_PAGE_MODAL]: modalReducer.setAndOpenModal,
  [CLOSE_CREATE_STORIES_PAGE_MODAL]: modalReducer.closeModal,
});
