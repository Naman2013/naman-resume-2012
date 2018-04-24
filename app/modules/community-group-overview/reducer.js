import cloneDeep from 'lodash/cloneDeep';
import createReducer from '../utils/createReducer';
import {
  FETCH_GROUP_OVERVIEW_START,
  FETCH_GROUP_OVERVIEW_SUCCESS,
  FETCH_GROUP_OVERVIEW_FAIL,
  FETCH_GROUP_OVERVIEW_PAGE_META_FAIL,
  FETCH_GROUP_OVERVIEW_PAGE_META_START,
  FETCH_GROUP_OVERVIEW_PAGE_META_SUCCESS,
} from './actions';

import {
  TOGGLE_JOIN_GROUP_SUCCESS,
} from '../community-groups/actions';

const initialState = {
  fetching: false,
  error: false,
  count: 12,
  pageMeta: {},
};

export default createReducer(initialState, {
  [FETCH_GROUP_OVERVIEW_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_GROUP_OVERVIEW_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: false,
      ...payload,
    };
  },
  [FETCH_GROUP_OVERVIEW_FAIL](state) {
    return {
      ...state,
      fetching: false,
      error: true,
      groupsCount: 0,
      page: 0,
    };
  },
  [FETCH_GROUP_OVERVIEW_PAGE_META_START](state) {
    return {
      ...state,
    };
  },
  [FETCH_GROUP_OVERVIEW_PAGE_META_SUCCESS](state, { payload }) {
    return {
      ...state,
      pageMeta: payload,
    };
  },
  [FETCH_GROUP_OVERVIEW_PAGE_META_FAIL](state) {
    return {
      ...state,
      error: true,
    };
  },
  [TOGGLE_JOIN_GROUP_SUCCESS](state, { payload }) {
    const {
      askPrompt,
      joinPrompt,
      showAskPrompt,
      showJoinPrompt,
    } = payload;
    return {
      ...state,
      // askPrompt,
      joinPrompt,
      // showAskPrompt,
      showJoinPrompt,
      pageMeta: Object.assign({}, state.pageMeta, { joinPrompt, showJoinPrompt })
    };
  },

});
