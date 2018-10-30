import createReducer from '../../utils/createReducer';
import initialState from './initialState';

import {
  FETCH_QUEST_PAGE_META_START,
  FETCH_QUEST_PAGE_META_SUCCESS,
  FETCH_QUEST_PAGE_META_FAILURE,
} from '../actions/pageMeta';

import * as pageMetaReducer from './pageMeta';

export default createReducer(initialState, {
  [FETCH_QUEST_PAGE_META_START]: pageMetaReducer.fetchPageMetaStart,
  [FETCH_QUEST_PAGE_META_SUCCESS]: pageMetaReducer.fetchPageMetaSuccess,
  [FETCH_QUEST_PAGE_META_FAILURE]: pageMetaReducer.fetchPageMetaFailure,
});
