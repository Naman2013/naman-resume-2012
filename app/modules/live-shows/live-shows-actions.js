import axios from 'axios';

export const FETCH_LIVE_SHOW_INFO_START = 'START_FETCH_LIVE_SHOW_INFO';
export const FETCH_LIVE_SHOW_INFO_SUCCESS = 'FETCH_LIVE_SHOW_INFO_SUCCESS';
export const FETCH_LIVE_SHOW_INFO_FAIL = 'FETCH_LIVE_SHOW_INFO_FAIL';

const fetchLiveShowStart = () => ({
  type: FETCH_LIVE_SHOW_INFO_START,
});

const fetchLiveShowInfoSuccess = payload => ({
  type: FETCH_LIVE_SHOW_INFO_SUCCESS,
  payload,
});

const fetchLiveShowFail = payload => ({
  type: FETCH_LIVE_SHOW_INFO_FAIL,
  payload,
});

export const fetchLiveShowInfo = showId => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  let testShowId = showId;
  dispatch(fetchLiveShowStart());

  /* for testing purposes */
  testShowId = 388;

  return axios.post('/api/events/getLiveShowInfo', {
    at,
    token,
    cid,
    showId: testShowId,
  })
  .then(result => dispatch(fetchLiveShowInfoSuccess(result.data)))
  .catch(error => dispatch(fetchLiveShowFail(error)));
};
