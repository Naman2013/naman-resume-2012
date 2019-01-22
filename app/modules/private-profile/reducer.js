import createReducer from '../utils/createReducer';
import {
  FETCH_PRIVATE_PROFILE_START,
  FETCH_PRIVATE_PROFILE_SUCCESS,
  FETCH_PRIVATE_PROFILE_FAIL,
} from './actions';

const initialState = {
  privateProfileData: {},
  error: false,
};

export default createReducer(initialState, {
  [FETCH_PRIVATE_PROFILE_START]() {
    return {
      ...initialState,
      error: false,
    };
  },
  [FETCH_PRIVATE_PROFILE_SUCCESS](state, { payload }) {
    const { apiError } = payload;
    return {
      ...state,
      error: apiError,
      privateProfileData: payload,
    };
  },
  [FETCH_PRIVATE_PROFILE_FAIL](state, { payload }) {
    return {
      ...state,
      error: true,
      ...payload,
    };
  },
});
