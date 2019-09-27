import createReducer from '../../utils/createReducer';
import initialState from './initialState';

import {
  FETCH_QUEST_PAGE_META_START,
  FETCH_QUEST_PAGE_META_SUCCESS,
  FETCH_QUEST_PAGE_META_FAILURE,
} from '../actions/pageMeta';

import {
  SET_QUEST_DETAIL_PAGE_MODAL,
  OPEN_QUEST_DETAIL_PAGE_MODAL,
  CLOSE_QUEST_DETAIL_PAGE_MODAL,
  SET_AND_OPEN_QUEST_DETAIL_PAGE_MODAL,
} from '../actions/modal';

import {
  FETCH_QUEST_STEP_START,
  FETCH_QUEST_STEP_SUCCESS,
  FETCH_QUEST_STEP_FAILURE,
} from '../actions/step';

import {
  FETCH_QUEST_COMPLETE_OVERVIEW_START,
  FETCH_QUEST_COMPLETE_OVERVIEW_SUCCESS,
  FETCH_QUEST_COMPLETE_OVERVIEW_FAILURE,
} from '../actions/complete';

import * as pageMetaReducer from './pageMeta';
import * as modalReducer from './modal';
import * as stepReducer from './step';
import * as completeReducer from './complete';

export default createReducer(initialState, {
  [FETCH_QUEST_PAGE_META_START]: pageMetaReducer.fetchPageMetaStart,
  [FETCH_QUEST_PAGE_META_SUCCESS]: pageMetaReducer.fetchPageMetaSuccess,
  [FETCH_QUEST_PAGE_META_FAILURE]: pageMetaReducer.fetchPageMetaFailure,
  [SET_QUEST_DETAIL_PAGE_MODAL]: modalReducer.setModal,
  [OPEN_QUEST_DETAIL_PAGE_MODAL]: modalReducer.openModal,
  [CLOSE_QUEST_DETAIL_PAGE_MODAL]: modalReducer.closeModal,
  [SET_AND_OPEN_QUEST_DETAIL_PAGE_MODAL]: modalReducer.setAndOpenModal,
  [FETCH_QUEST_STEP_START]: stepReducer.fetchStepStart,
  [FETCH_QUEST_STEP_SUCCESS]: stepReducer.fetchStepSuccess,
  [FETCH_QUEST_STEP_FAILURE]: stepReducer.fetchStepFailure,
  [FETCH_QUEST_COMPLETE_OVERVIEW_START]: completeReducer.fetchCompleteStart,
  [FETCH_QUEST_COMPLETE_OVERVIEW_SUCCESS]: completeReducer.fetchCompleteSuccess,
  [FETCH_QUEST_COMPLETE_OVERVIEW_FAILURE]: completeReducer.fetchCompleteFailure,
});
