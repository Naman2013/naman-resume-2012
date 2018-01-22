import axios from 'axios';
import cancelMission from '../../services/reservations/cancel-mission.js';
import cancelPiggyback from '../../services/reservations/cancel-piggyback.js';
import { fetchDashboard } from '../dashboard/actions';

export const CANCEL_MYMISSION_START = 'CANCEL_MYMISSION_START';
export const CANCEL_MYMISSION_SUCCESS = 'CANCEL_MYMISSION_SUCCESS';
export const CANCEL_MYMISSION_FAILURE = 'CANCEL_MYMISSION_FAILURE';

export const CANCEL_MYPIGGYBACK_START = 'CANCEL_MYPIGGYBACK_START';
export const CANCEL_MYPIGGYBACK_SUCCESS = 'CANCEL_MYPIGGYBACK_SUCCESS';
export const CANCEL_MYPIGGYBACK_FAILURE = 'CANCEL_MYPIGGYBACK_FAILURE';

export const cancelMyMission = ({
  scheduledMissionId,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(cancelMyMissionStart());
  return cancelMission( {
    at,
    token,
    cid,
    scheduledMissionId,
  })
    .then((result) => {
      //refresh user's dashboard
      dispatch( fetchDashboard({}) );

      return dispatch(cancelMyMissionSuccess(result.data));
    })
    .catch(error => dispatch(cancelMyMissionFailure(error: error)));
};

const cancelMyMissionStart = () => ({
  type: CANCEL_MYMISSION_START,
});

const cancelMyMissionSuccess = payload => ({
    type: CANCEL_MYMISSION_SUCCESS,
    payload: payload,
});

const cancelMyMissionFailure= payload => ({
  type: CANCEL_MYMISSION_FAILURE,
  payload: payload,
});


export const cancelMyPiggyback = ({
  scheduledMissionId,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(cancelMyPiggybackStart());
  return cancelPiggyback( {
    at,
    token,
    cid,
    scheduledMissionId,
  })
    .then((result) => {
      //refresh user's dashboard
      dispatch( fetchDashboard({}) );

      return dispatch(cancelMyPiggybackSuccess(result.data));
    })
    .catch(error => dispatch(cancelMyPiggybackFailure(error: error)));
};

const cancelMyPiggybackStart = () => ({
  type: CANCEL_MYPIGGYBACK_START,
});

const cancelMyPiggybackSuccess = payload => ({
    type: CANCEL_MYPIGGYBACK_SUCCESS,
    payload: payload,
});

const cancelMyPiggybackFailure = payload => ({
  type: CANCEL_MYPIGGYBACK_FAILURE,
  payload: payload,
});
