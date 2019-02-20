import createReducer from '../utils/createReducer';
import {
  FETCH_PUBLIC_PROFILE_START,
  FETCH_PUBLIC_PROFILE_SUCCESS,
  FETCH_PUBLIC_PROFILE_FAIL,
} from './actions';

const initialState = {
  refreshIntervalSec: 0,
  memberName: '',
  displayName: '',
  memberSinceMDY: '',
  avatarType: '',
  avatarURL: '',
  membershipType: '',
  missionCount: 0,
  missionList: [],
  error: false,
};

export default createReducer(initialState, {
  [FETCH_PUBLIC_PROFILE_START]() {
    return {
      ...initialState,
      error: false,
    };
  },
  [FETCH_PUBLIC_PROFILE_SUCCESS](state, { payload }) {
    const { apiError } = payload;
    return {
      ...state,
      error: apiError,
      ...payload,
    };
  },
  [FETCH_PUBLIC_PROFILE_FAIL](state, { payload }) {
    return {
      ...state,
      error: true,
      ...payload,
    };
  },
});
