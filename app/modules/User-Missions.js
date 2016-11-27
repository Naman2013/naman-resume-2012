import createReducer from './utils/createReducer';
import createAction from './utils/createAction';
import axios from 'axios';

const FETCH_USERS_UPCOMING_MISSIONS_START = 'FETCH_USERS_UPCOMING_MISSIONS_START';
const FETCH_USERS_UPCOMING_MISSIONS_SUCCESS = 'FETCH_USERS_UPCOMING_MISSIONS_SUCCESS';
const FETCH_USERS_UPCOMING_MISSIONS_FAIL = 'FECTH_USERS_UPCOMING_MISSIONS_FAIL';

export const fetchUsersUpcomingMissions = () => ( dispatch, getState ) {

};

const initialState = {
  fetchingMissions: false,
  fetchingMissionsFailed: false,
  upcomingMission: null,
};

export default createReducer(initialState, {
  [FETCH_USERS_UPCOMING_MISSIONS_START]( state ) {
    return {
      ...state,
    };
  }
  [FETCH_USERS_UPCOMING_MISSIONS_SUCCESS]( state, { payload } ) {
    return {
      ...state,
    };
  }
  [FETCH_USERS_UPCOMING_MISSIONS_FAIL]( state ) {
    return {
      ...state,
    };
  }
});
