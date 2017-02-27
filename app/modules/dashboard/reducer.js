import _ from 'lodash';
import createReducer from '../utils/createReducer';
import {
  FETCH_DASHBOARD_START,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAIL,
} from './actions';
import {
  SET_AVATAR_SUCCESS,
} from '../avatar/actions';

const initialState = {
  refreshIntervalSec: 300,
  profile: {},
  error: false,
};

export default createReducer(initialState, {
  [FETCH_DASHBOARD_START](state) {
    return {
      ...state,
      error: false,
      profile: {},
    };
  },
  [FETCH_DASHBOARD_SUCCESS](state, { payload }) {
    const { apiError } = payload;
    return {
      ...state,
      error: apiError,
      profile: payload,
    };
  },
  [FETCH_DASHBOARD_FAIL](state, { payload }) {
    return {
      ...state,
      error: true,
      profile: {}
    };
  },
  [SET_AVATAR_SUCCESS](state, { payload }) {
    const { imageURL } = payload
    const newState = state;
    newState.profile.avatarURL = imageURL;
    return {
      ...newState,
      error: true,
    };
  },
});
