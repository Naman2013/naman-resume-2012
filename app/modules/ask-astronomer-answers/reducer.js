import cloneDeep from 'lodash/cloneDeep';
import createReducer from '../utils/createReducer';
import {
  FETCH_ASTRONOMER_ANSWERS_START,
  FETCH_ASTRONOMER_ANSWERS_SUCCESS,
  FETCH_ASTRONOMER_ANSWERS_FAIL,
} from './actions';

const initialState = {
  fetching: false,
  page: 0,
  error: false,
  resultsCount: 0,
  allReplies: {}
};

export default createReducer(initialState, {
  [FETCH_ASTRONOMER_ANSWERS_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_ASTRONOMER_ANSWERS_SUCCESS](state, { payload }) {
    const { replies, threadId, page, resultsCount } = payload;
    const newState = cloneDeep(state.allReplies);
    newState[threadId] = replies;

    return {
      ...state,
      fetching: false,
      allReplies: newState,
      resultsCount,
    };
  },
  [FETCH_ASTRONOMER_ANSWERS_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
      allReplies: {},
      resultsCount: 0,
      page: 0,
    };
  },
});
