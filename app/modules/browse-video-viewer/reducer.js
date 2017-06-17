import createReducer from '../utils/createReducer';
import {
  FETCH_PREVIOUS_SHOWS_START,
  FETCH_PREVIOUS_SHOWS_SUCCESS,
  FETCH_PREVIOUS_SHOWS_FAIL,
} from './previous-shows-actions';

import {
  FETCH_HIGHLIGHTS_SHOWS_START,
  FETCH_HIGHLIGHTS_SHOWS_SUCCESS,
  FETCH_HIGHLIGHTS_SHOWS_FAIL,
} from './highlights-shows-actions';

import {
  FETCH_UPCOMING_SHOWS_START,
  FETCH_UPCOMING_SHOWS_SUCCESS,
  FETCH_UPCOMING_SHOWS_FAIL,
} from './upcoming-shows-actions';


const initialState = {
  page: 1,
  count: 9,
  pages: 0,
  resultsCount: '0',
  eventList: [],
};

export default createReducer(initialState, {
  [FETCH_PREVIOUS_SHOWS_START]() {
    return {
      ...initialState,
    };
  },
  [FETCH_PREVIOUS_SHOWS_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
  [FETCH_PREVIOUS_SHOWS_FAIL]() {
    return {
      ...initialState,
      apiError: true,
    };
  },
  [FETCH_HIGHLIGHTS_SHOWS_START]() {
    return {
      ...initialState,
    };
  },
  [FETCH_HIGHLIGHTS_SHOWS_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
  [FETCH_HIGHLIGHTS_SHOWS_FAIL]() {
    return {
      ...initialState,
      apiError: true,
    };
  },
  [FETCH_UPCOMING_SHOWS_START]() {
    return {
      ...initialState,
    };
  },
  [FETCH_UPCOMING_SHOWS_SUCCESS](state, { payload }) {
    return {
      ...state,
      ...payload,
    };
  },
  [FETCH_UPCOMING_SHOWS_FAIL]() {
    return {
      ...initialState,
      apiError: true,
    };
  },
});
