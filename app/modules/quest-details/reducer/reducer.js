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
} from '../actions/modal';

import * as pageMetaReducer from './pageMeta';
import * as modalReducer from './modal';

export default createReducer(initialState, {
  [FETCH_QUEST_PAGE_META_START]: pageMetaReducer.fetchPageMetaStart,
  [FETCH_QUEST_PAGE_META_SUCCESS]: pageMetaReducer.fetchPageMetaSuccess,
  [FETCH_QUEST_PAGE_META_FAILURE]: pageMetaReducer.fetchPageMetaFailure,
  [SET_QUEST_DETAIL_PAGE_MODAL]: modalReducer.setModal,
  [OPEN_QUEST_DETAIL_PAGE_MODAL]: modalReducer.openModal,
  [CLOSE_QUEST_DETAIL_PAGE_MODAL]: modalReducer.closeModal,
});
