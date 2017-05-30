import createReducer from '../utils/createReducer';
import {
  FETCH_PREVIOUS_SHOWS_START,
  FETCH_PREVIOUS_SHOWS_SUCCESS,
  FETCH_PREVIOUS_SHOWS_FAIL,
} from './previous-shows-actions';

const initialState = {
  page: 1,
  count: 9,
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
});
