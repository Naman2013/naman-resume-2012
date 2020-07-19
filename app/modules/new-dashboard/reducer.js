import createReducer from '../utils/createReducer';
import { FETCH_STAR_PARTY_LIST_START,
         FETCH_STAR_PARTY_LIST_SUCCESS,
         GET_USER_GRAVITY_STATUS_START,
         GET_USER_GRAVITY_STATUS_SUCCESS,
         GET_MY_PICTURES_START,
         GET_MY_PICTURES_SUCCESS,
         GET_DASHBOARD_FEATURED_OBJECTS_START,
         GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS,
         GET_MY_CLUB_LIST_START,
         GET_MY_CLUB_LIST_SUCCESS,
         GET_BOOKMARK_LIST_START,
         GET_BOOKMARK_LIST_SUCCESS,
         GET_PRIVATE_PROFILE_START,
         GET_PRIVATE_PROFILE_SUCCESS } from './actions';

const initialState = {
    isFetching: true,    
}

export default createReducer(initialState, {
    [FETCH_STAR_PARTY_LIST_SUCCESS](state, { payload }) {               
        return {
          ...state,
          upcomingStarPartyList: payload,
          isFetching: false,
        };
      },
      [FETCH_STAR_PARTY_LIST_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_USER_GRAVITY_STATUS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          userGravityStatus: payload,
          isFetching: false,
        };
      },
      [GET_USER_GRAVITY_STATUS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_MY_PICTURES_SUCCESS](state, { payload }) {               
        return {
          ...state,
          photoHub: payload,
          isFetching: false,
        };
      },
      [GET_MY_PICTURES_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS](state, { payload }) {               
        return {
          ...state,
          dashboardFeaturedObjects: payload,
          isFetching: false,
        };
      },
      [GET_DASHBOARD_FEATURED_OBJECTS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_MY_CLUB_LIST_SUCCESS](state, { payload }) {               
        return {
          ...state,
          myClubList: payload,
          isFetching: false,
        };
      },
      [GET_MY_CLUB_LIST_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_BOOKMARK_LIST_SUCCESS](state, { payload }) {               
        return {
          ...state,
          bookmarkList: payload,
          isFetching: false,
        };
      },
      [GET_BOOKMARK_LIST_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      },
      [GET_PRIVATE_PROFILE_SUCCESS](state, { payload }) {               
        return {
          ...state,
          privteProfile: payload,
          isFetching: false,
        };
      },
      [GET_USER_GRAVITY_STATUS_START](state) {
        return {
          ...state,
          isFetching: true,
        };
      }
});


