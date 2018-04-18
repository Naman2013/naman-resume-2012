import axios from 'axios';

export const FETCH_DASHBOARD_START = 'FETCH_DASHBOARD_START';
export const FETCH_DASHBOARD_SUCCESS = 'FETCH_DASHBOARD_SUCCESS';
export const FETCH_DASHBOARD_FAILURE = 'FETCH_DASHBOARD_FAILURE';

export const fetchDashboard = ({
  lang,
  ver,
  lookbackDays,
}) => (dispatch, getState) => {
  const user = getState().user;
  dispatch(fetchDashboardStart());
  return axios.post('/api/settings/getDashboard', {
    lang,
    lookbackDays,
    ver,
    at: user.at,
    token: user.token,
    cid: user.cid,
  })
    .then(result => dispatch(fetchDashboardSuccess(result.data)))
    .catch(error => dispatch(fetchDashboardFailure(error)));
};

const fetchDashboardStart = () => ({
  type: FETCH_DASHBOARD_START,
});

const fetchDashboardSuccess = payload => ({
  type: FETCH_DASHBOARD_SUCCESS,
  payload,
});

const fetchDashboardFailure = payload => ({
  type: FETCH_DASHBOARD_FAILURE,
  payload,
});
