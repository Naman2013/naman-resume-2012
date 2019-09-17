import { API } from 'app/api';
import { getDashboardFeaturedObjectsApi } from './api';

export const FETCH_DASHBOARD_START = 'FETCH_DASHBOARD_START';
export const FETCH_DASHBOARD_SUCCESS = 'FETCH_DASHBOARD_SUCCESS';
export const FETCH_DASHBOARD_FAILURE = 'FETCH_DASHBOARD_FAILURE';
export const GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS =
  'GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS';

export const fetchDashboard = ({ lang, ver, lookbackDays }) => (
  dispatch,
  getState
) => {
  const { user } = getState();
  dispatch(fetchDashboardStart());
  return API
      .post('/api/settings/getDashboard', {
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

export const getDashboardFeaturedObjects = () => (dispatch, getState) => {
  const { user } = getState();
  dispatch(fetchDashboardStart());
  return getDashboardFeaturedObjectsApi({
    at: user.at,
    token: user.token,
    cid: user.cid,
  })
    .then(result => dispatch(getDashboardFeaturedObjectsSuccess(result.data)))
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

const getDashboardFeaturedObjectsSuccess = payload => ({
  type: GET_DASHBOARD_FEATURED_OBJECTS_SUCCESS,
  payload,
});


