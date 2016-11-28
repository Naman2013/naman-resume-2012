import createReducer from './utils/createReducer';
import createAction from './utils/createAction';
import axios from 'axios';

const FETCH_USERS_UPCOMING_MISSIONS_START = 'FETCH_USERS_UPCOMING_MISSIONS_START';
const FETCH_USERS_UPCOMING_MISSIONS_SUCCESS = 'FETCH_USERS_UPCOMING_MISSIONS_SUCCESS';
const FETCH_USERS_UPCOMING_MISSIONS_FAIL = 'FECTH_USERS_UPCOMING_MISSIONS_FAIL';

export const fetchUsersUpcomingMissions = () => ( dispatch, getState ) => {
  const { cid, at, token } = getState.user;
  return axios.post('/api/reservation/getNextUserMission', {
    cid,
    at,
    token,
  })
  .then( result => dispatch( fetchUsersUpcomingMissionsSuccess( result.data ) ) )
  .catch( error => dispatch( fetchUsersUpcomingMissionsFail( error ) ) );
};

const fetchUsersUpcomingMissionsSuccess = ( payload ) => ({
  type: FETCH_USERS_UPCOMING_MISSIONS_SUCCESS,
  payload,
});

const fetchUsersUpcomingMissionsFail = ( error ) => ({
  type: FETCH_USERS_UPCOMING_MISSIONS_FAIL,
  error,
});



const initialState = {
  fetchingMissions: false,
  fetchingMissionsFailed: false,
  upcomingMission: null,
  upcomingMissionError: null,
};

export default createReducer(initialState, {
  [FETCH_USERS_UPCOMING_MISSIONS_START]() {
    return {
      fetchingMissions: true,
      fetchingMissionsFailed: false,
      upcomingMission: null,
      upcomingMissionError: null,
    };
  },
  [FETCH_USERS_UPCOMING_MISSIONS_SUCCESS]( state, { payload } ) {
    return {
      fetchingMissions: false,
      fetchingMissionsFailed: false,
      upcomingMission: payload,
      upcomingMissionError: null,
    };
  },
  [FETCH_USERS_UPCOMING_MISSIONS_FAIL]( state, { error } ) {
    return {
      fetchingMissions: false,
      fetchingMissionsFailed: true,
      upcomingMission: null,
      upcomingMissionError: error,
    };
  },
});
