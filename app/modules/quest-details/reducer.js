import clone from 'lodash/clone';
import createReducer from '../utils/createReducer';

import {
  FETCH_QUEST_DATA,
  FETCH_QUEST_DATA_START,
  FETCH_QUEST_DATA_SUCCESS,
  FETCH_QUEST_DATA_FAIL,
  RESET_QUEST_DATA,

  } from './actions';

const initialState = {
  questData: {},
};

export default createReducer(initialState, {
  [FETCH_QUEST_DATA_SUCCESS](state, { payload }) {
    return {
      ...state,
      questData: payload,
    };
  },
  [RESET_QUEST_DATA](state) {
    return {
      ...state,
      questData: Object.assign({}, initialState.questData),
    };
  },
  [FETCH_QUEST_DATA_START](state) {
    return {
      ...state,
      questData: Object.assign({}, initialState.questData),
    };
  },
  [FETCH_QUEST_DATA_FAIL](state, { payload }) {
    return {
      ...state,
      questData: Object.assign({}, initialState.questData),
      errorBody: payload,
    };
  },
});
