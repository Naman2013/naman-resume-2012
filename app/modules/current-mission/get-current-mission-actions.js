import axios from 'axios';

export const FETCH_CURRENT_MISSION_START = 'FETCH_CURRENT_MISSION_START';
export const FETCH_CURRENT_MISSION_SUCCESS = 'FETCH_CURRENT_MISSION_SUCCESS';
export const FETCH_CURRENT_MISSION_FAIL = 'FETCH_CURRENT_MISSION_FAIL';

const fetchCurrentMissionStart = () => ({
  type: FETCH_CURRENT_MISSION_START,
});

const fetchCurrentMissionSuccess = payload => ({
  type: FETCH_CURRENT_MISSION_SUCCESS,
  payload,
});

const fetchCurrentMissionFail = payload => ({
  type: FETCH_CURRENT_MISSION_FAIL,
  payload,
});

export const fetchCurrentMission = ({ obsId, domeId, telescopeId, format }) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;

  dispatch(fetchCurrentMissionStart());

  return axios.post('/api/reservation/getCurrentMission', {
    cid,
    at,
    token,
    obsId,
    domeId,
    telescopeId,
    format,
  })
  .then(result => dispatch(fetchCurrentMissionSuccess(result.data)))
  .catch(error => dispatch(fetchCurrentMissionFail(error)));
}
