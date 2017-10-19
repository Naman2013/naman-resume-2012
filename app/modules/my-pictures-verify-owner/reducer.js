import createReducer from '../utils/createReducer';

import {
  MY_PICS_VERIFY_OWNER_SUCCESS,
  MY_PICS_VERIFY_OWNER_FAIL,
  MY_PICS_VERIFY_OWNER_START,
} from './actions';

const initialState = {
  error: false,
  isOwner: false,
};

export default createReducer(initialState, {
  [MY_PICS_VERIFY_OWNER_START](state) {
    return {
      ...initialState,
    };
  },
  [MY_PICS_VERIFY_OWNER_SUCCESS](state, { payload }) {
    return {
      ...state,
      isOwner: payload.isOwner
    };
  },
  [MY_PICS_VERIFY_OWNER_FAIL](state, { payload }) {
    return {
      ...state,
      error: true,
    };
  },
});
