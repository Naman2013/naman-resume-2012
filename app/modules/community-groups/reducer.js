import cloneDeep from 'lodash/cloneDeep';
import createReducer from '../utils/createReducer';
import {
  FETCH_GROUPS_LIST_START,
  FETCH_GROUPS_LIST_SUCCESS,
  FETCH_GROUPS_LIST_FAIL,
  TOGGLE_JOIN_GROUP_SUCCESS,
  FETCH_GROUPS_PAGE_META_FAIL,
  FETCH_GROUPS_PAGE_META_START,
  FETCH_GROUPS_PAGE_META_SUCCESS,
} from './actions';

const initialState = {
  fetching: false,
  page: 0,
  pages: 0,
  error: false,
  count: 12,
  groupsCount: 0,
  groups: [],
  pageMeta: {},
  paginationCount: 5,
};

export default createReducer(initialState, {
  [FETCH_GROUPS_LIST_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_GROUPS_LIST_SUCCESS](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: false,
      ...payload,
    };
  },
  [FETCH_GROUPS_LIST_FAIL](state) {
    return {
      ...state,
      fetching: false,
      error: true,
      groupsCount: 0,
      page: 0,
    };
  },
  [TOGGLE_JOIN_GROUP_SUCCESS](state, { payload }) {
    const {
      askPrompt,
      discussionGroupId,
      joinPrompt,
      showAskPrompt,
      showJoinPrompt,
      memberCountDisplay,
      memberCount,
      groupSet
    } = payload;
    let newGroups = [].concat(state.groups);
    if (groupSet === 'my-groups') {
      newGroups = newGroups.filter(group => group.discussionGroupId !== discussionGroupId);
    }
    newGroups = newGroups.map((group) => {
      if (group.discussionGroupId === discussionGroupId) {
        Object.assign(group, {
          askPrompt,
          joinPrompt,
          showAskPrompt,
          showJoinPrompt,
          memberCountDisplay,
          memberCount,
        })
      }
      return group;
    })
    return {
      ...state,
      groups: newGroups,
    };
  },

  [FETCH_GROUPS_PAGE_META_START](state) {
    return {
      ...state,
    };
  },
  [FETCH_GROUPS_PAGE_META_SUCCESS](state, { payload }) {
    return {
      ...state,
      pageMeta: payload,
    };
  },
  [FETCH_GROUPS_PAGE_META_FAIL](state) {
    return {
      ...state,
      error: true,
    };
  },

});
