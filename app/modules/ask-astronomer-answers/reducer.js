import cloneDeep from 'lodash/cloneDeep';
import createReducer from '../utils/createReducer';
import {
  FETCH_ASTRONOMER_ANSWERS_START,
  FETCH_ASTRONOMER_ANSWERS_SUCCESS,
  FETCH_ASTRONOMER_ANSWERS_FAIL,
  TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS,
  UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST,
} from './actions';

const initialState = {
  fetching: false,
  page: 0,
  error: false,
  resultsCount: 0,
  allAnswers: {},
  allDisplayedAnswers: {},
  showAllAnswers: false,
};

export default createReducer(initialState, {
  [FETCH_ASTRONOMER_ANSWERS_START](state) {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_ASTRONOMER_ANSWERS_SUCCESS](state, { payload }) {
    const { replies, threadId, resultsCount } = payload;
    const newAllAnswers = cloneDeep(state.allAnswers);
    const newAllDisplayedAnswers = cloneDeep(state.allDisplayedAnswers);
    newAllAnswers[threadId] = {
      replies,
      page: 1,
      topAnswer: replies.length > 0 ? replies[0].replyId : null,
    };
    newAllDisplayedAnswers[threadId] = replies.length > 0 ? [replies[0]] : [];

    return {
      ...state,
      fetching: false,
      allAnswers: newAllAnswers,
      allDisplayedAnswers: newAllDisplayedAnswers,
      resultsCount,
    };
  },
  [FETCH_ASTRONOMER_ANSWERS_FAIL](state, { payload }) {
    return {
      ...state,
      fetching: false,
      error: true,
      allAnswers: {},
      allDisplayedAnswers: {},
      resultsCount: 0,
      page: 0,
    };
  },
  [TOGGLE_ALL_ASK_ASTRONOMER_ANSWERS](state, { payload }) {
    return {
      showAllAnswers: !state.showAllAnswers,
    };
  },
  [UPDATE_TOGGLE_ASK_ASTRONOMER_ANSWER_DISPLAY_LIST](state, { payload }) {
    const {
      page,
      threadId,
      displayedAnswers,
    } = payload;

    const newState = cloneDeep(state.allDisplayedAnswers);
    newState[threadId] = displayedAnswers;

    return {
      page,
      allDisplayedAnswers: newState,
    };
  },
});
