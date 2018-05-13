import createReducer from '../utils/createReducer';
import {
  FETCH_GROUP_ACTIVITY_START,
  FETCH_GROUP_ACTIVITY_SUCCESS,
  FETCH_GROUP_ACTIVITY_FAIL,
  CREATE_ACTIVITY_ITEM_SUCCESS,
} from './actions';

const initialState = {
  fetching: false,
  error: false,
  count: 10,
  threadList: [],
  threadCount: 0,
};

export default createReducer(initialState, {
  [FETCH_GROUP_ACTIVITY_START](state, { payload }) {
    const { appendToList } = payload;
    return {
      ...state,
      threadList: appendToList ? state.threadList : [],
      fetching: true,
    };
  },
  [FETCH_GROUP_ACTIVITY_SUCCESS](state, { payload }) {
    const {
      threads,
      threadCount,
      page,
      appendToList,
    } = payload;
    const threadList = appendToList ? [].concat(state.threadList, threads) : threads;

    return {
      ...state,
      fetching: false,
      threadCount,
      page,
      threadList,
    };
  },
  [FETCH_GROUP_ACTIVITY_FAIL](state) {
    return {
      ...state,
      fetching: false,
      error: true,
      threadList: [],
      threadCount: 0,
      page: 0,
    };
  },
  [CREATE_ACTIVITY_ITEM_SUCCESS](state, { payload }) {
    const { thread } = payload;
    const threadList = [].concat(state.threadList, thread);

    return {
      ...state,
      fetching: false,
      threadCount: state.threadCount + 1,
      threadList,
    };
  },
});
