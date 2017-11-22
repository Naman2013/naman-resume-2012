import {
  START_FETCH_PLAYER,
  SUCCESS_FETCH_PLAYER,
  FAIL_FETCH_PLAYER,
} from './actions';

import createReducer from '../utils/createReducer';

const initialState = {
  loadingContent: false,
};

export default createReducer(initialState, {
  [START_FETCH_PLAYER](state) {
    return {
      ...state,
      loadingContent: true,
    };
  },
  [SUCCESS_FETCH_PLAYER](state) {
    return {
      ...state,
      loadingContent: false,
    };
  },
  [FAIL_FETCH_PLAYER](state) {
    return {
      ...state,
      loadingContent: false,
    };
  },
});
