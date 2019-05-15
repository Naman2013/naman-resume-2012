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
  GROUP_DESCRIPTION_CHANGE_START,
  GROUP_DESCRIPTION_CHANGE_SUCCESS,
  GROUP_DESCRIPTION_CHANGE_FAIL,
  FETCH_GROUP_INVITATION_PANEL_START,
  FETCH_GROUP_INVITATION_PANEL_SUCCESS,
  FETCH_GROUP_INVITATION_PANEL_FAIL,
  SORT_AZ,
  SORT_ZA,
  SORT_RANK,
  SORT_DATE,
} from './actions';
import { TOGGLE_JOIN_GROUP_SUCCESS } from '../community-groups/actions';

const initialState = {
  fetching: false,
  error: false,
  pageMeta: {},
  membersList: [],
  leadersList: [],
  membersCount: 0,
  membersCallError: false,
  membersCallFetching: false,
  membersSort: SORT_AZ,
  groupInformation: {},
};

export default createReducer(initialState, {
  [GROUP_DESCRIPTION_CHANGE_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [GROUP_DESCRIPTION_CHANGE_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetching: false,
      description: payload,
    };
  },
  [GROUP_DESCRIPTION_CHANGE_FAIL](state) {
    return {
      ...state,
      error: true,
      fetching: false,
    };
  },
  [FETCH_GROUP_INVITATION_PANEL_START](state) {
    return {
      ...state,
      error: false,
      fetching: true,
    };
  },
  [FETCH_GROUP_INVITATION_PANEL_SUCCESS](state, { payload }) {
    return {
      ...state,
      error: false,
      fetching: false,
      groupInformation: payload,
    };
  },
  [FETCH_GROUP_INVITATION_PANEL_FAIL](state) {
    return {
      ...state,
      error: true,
      fetching: false,
    };
  },
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
    return {
      ...state,
      // askPrompt,
      joinPrompt,
      // showAskPrompt,
      showJoinPrompt,
      pageMeta: Object.assign({}, state.pageMeta, {
        joinPrompt,
        showJoinPrompt,
        canPost,
      }),
    };
  },

  [FETCH_GROUP_MEMBERS_START](state) {
    return {
      ...state,
      membersCallError: false,
      membersCallFetching: true,
      membersCount: 0,
      membersList: [],
    };
  },
  [FETCH_GROUP_MEMBERS_SUCCESS](state, { payload }) {
    const { membersList, membersCount, sortBy, leadersList } = payload;
    return {
      ...state,
      membersList,
      leadersList,
      membersCount,
      membersSort: sortBy,
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
