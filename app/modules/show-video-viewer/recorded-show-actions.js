import axios from 'axios';

export const FETCH_RECORDED_SHOW_START = 'FETCH_RECORDED_SHOW_START';
export const FETCH_RECORDED_SHOW_SUCCESS = 'FETCH_RECORDED_SHOW_SUCCESS';
export const FETCH_RECORDED_SHOW_FAIL = 'FETCH_RECORDED_SHOW_FAIL';

const fetchRecordedShowStart = () => ({
  type: FETCH_RECORDED_SHOW_START,
});

const fetchRecordedShowSuccess = payload => ({
  type: FETCH_RECORDED_SHOW_SUCCESS,
  payload,
});

const fetchRecordedShowFail = payload => ({
  type: FETCH_RECORDED_SHOW_FAIL,
  payload,
});

export const fetchRecordedShow = ({
  showId,
}) => (dispatch, getState) => {
  dispatch(fetchRecordedShowStart());
  const { cid, at, token } = getState().user;
  return axios.post(' /api/events/getRecordedShowInfo', {
    showId,
    cid,
    at,
    token,
  })
    .then(result => dispatch(fetchRecordedShowSuccess(result.data)))
    .catch(error => dispatch(fetchRecordedShowFail(error)));
};
