import cloneDeep from 'lodash/cloneDeep';
import createReducer from '../utils/createReducer';
import {
  FETCH_DASHBOARD_START,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
  GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS,
} from './actions';
import { SET_AVATAR_SUCCESS } from '../avatar/actions';

const initialState = {
  refreshIntervalSec: 300,
  profile: {},
  featuredObjects: {
    recommendedObjectsShow: false,
    recommendedObjectsHeading: '',
    recommendedObjectsSubHeading: '',
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
  [FETCH_DASHBOARD_FAILURE](state, { payload }) {
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
});
