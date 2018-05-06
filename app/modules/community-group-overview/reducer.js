import createReducer from '../utils/createReducer';
import {
  FETCH_GROUP_OVERVIEW_START,
  FETCH_GROUP_OVERVIEW_SUCCESS,
  FETCH_GROUP_OVERVIEW_FAIL,
  FETCH_GROUP_OVERVIEW_PAGE_META_FAIL,
  FETCH_GROUP_OVERVIEW_PAGE_META_START,
  FETCH_GROUP_OVERVIEW_PAGE_META_SUCCESS,
  FETCH_GROUP_MEMBERS_START,
  FETCH_GROUP_MEMBERS_SUCCESS,
  FETCH_GROUP_MEMBERS_FAIL,
} from './actions';

import { TOGGLE_JOIN_GROUP_SUCCESS } from '../community-groups/actions';

const initialState = {
  fetching: false,
  error: false,
  pageMeta: {},
  membersList: [],
  membersCount: 0,
  membersCallError: false,
  membersCallFetching: false,
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
      canPost,
      askPrompt,
      joinPrompt,
      showAskPrompt,
      showJoinPrompt,
    } = payload;
    console.log('state', state)
    console.log('new canpost', canPost)
    return {
      ...state,
      // askPrompt,
      joinPrompt,
      // showAskPrompt,
      showJoinPrompt,
      pageMeta: Object.assign({}, state.pageMeta, { joinPrompt, showJoinPrompt, canPost })
    };
  },

  [FETCH_GROUP_MEMBERS_START](state) {
    return {
      ...state,
      membersCallError: false,
      membersCallFetching: true,
    };
  },
  [FETCH_GROUP_MEMBERS_SUCCESS](state, { payload }) {
    const { membersList, membersCount } = payload;
    return {
      ...state,
      membersList,
      membersCount,
      membersCallError: false,
      membersCallFetching: false,
    };
  },
  [FETCH_GROUP_MEMBERS_FAIL](state) {
    return {
      ...state,
      error: true,
      membersCallError: true,
      membersCallFetching: false,
    };
  },
});
