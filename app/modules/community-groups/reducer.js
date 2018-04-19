import createReducer from '../utils/createReducer';
import {
  FETCH_GROUPS_LIST_START,
  FETCH_GROUPS_LIST_SUCCESS,
  FETCH_GROUPS_LIST_FAIL,
} from './actions';

const initialState = {
  fetching: false,
  page: 0,
  error: false,
  count: 12,
  groupsCount: 0,
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

});
