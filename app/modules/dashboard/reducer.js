import { actions, constants } from 'ducks-helpers';
import cloneDeep from 'lodash/cloneDeep';
import { SET_AVATAR_SUCCESS } from '../avatar/actions';
import createReducer from '../utils/createReducer';
import {
  FETCH_DASHBOARD_FAILURE,
  FETCH_DASHBOARD_START,
  FETCH_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS,
} from './actions';

export const TYPE = constants('dashboard', ['~GET_GUEST_DASHBOARD']);
export const ACTION = actions(TYPE);

const initialState = {
  refreshIntervalSec: 300,
  profile: {},
  featuredObjects: {
    recommendedObjectsShow: false,
    recommendedObjectsHeading: '',
    recommendedObjectsSubHeading: '',
  },
  guestDashboard: {
    Sections: {},
  },
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
  [FETCH_DASHBOARD_FAILURE](state) {
    return {
      ...state,
      error: true,
      profile: {},
    };
  },
  [SET_AVATAR_SUCCESS](state, { payload }) {
    const { imageURL, apiError } = payload;
    const newState = cloneDeep(state);
    newState.profile.avatarURL = !apiError ? imageURL : state.profile.avatarURL;
    return {
      ...newState,
      error: true,
    };
  },
  [GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS](state, { payload }) {
    return {
      ...state,
      featuredObjects: payload,
    };
  },
  [TYPE.GET_GUEST_DASHBOARD_SUCCESS](state, { payload }) {
    return {
      ...state,
      guestDashboard: payload,
    };
  },
});
