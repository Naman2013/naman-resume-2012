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
  allAnswers: {},
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
    const newState = cloneDeep(state.allAnswers);
    newState[threadId] = {
      replies,
      topAnswer: replies.length > 0 ? replies[0].replyId : null,
    };

    return {
      ...state,
      fetching: false,
      allAnswers: newState,
      resultsCount,
    };
  },
  [FETCH_ASTRONOMER_ANSWERS_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
      allAnswers: {},
      resultsCount: 0,
      page: 0,
    };
  },
});
