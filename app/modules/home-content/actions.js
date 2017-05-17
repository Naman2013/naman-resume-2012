import axios from 'axios';

export const GET_HOME_PAGE_START = 'GET_HOME_PAGE_START';
export const GET_HOME_PAGE_SUCCESS = 'GET_HOME_PAGE_SUCCESS';
export const GET_HOME_PAGE_FAIL = 'GET_HOME_PAGE_FAIL';

export const TRACK_USER_START = 'TRACK_USER_START';
export const TRACK_USER_SUCCESS = 'TRACK_USER_SUCCESS';
export const TRACK_USER_FAIL = 'TRACK_USER_FAIL';

export const getHomePageStart = () => ({
  type: GET_HOME_PAGE_START,
});

export const getHomePageSuccess = ({ data }) => ({
  type: GET_HOME_PAGE_SUCCESS,
  data,
});

export const getHomePageFail = ({ error }) => ({
  type: GET_HOME_PAGE_FAIL,
  error,
});

export const getHomePage = () => (dispatch, getState) => {
  const { at, cid, token } = getState().user;
  dispatch(getHomePageStart());
  axios
    .post('/api/app/getHomePage', {
      at, cid, token,
    })
    .then((result) => {
      dispatch(getHomePageSuccess(result));
    })
    .catch((error) => {
      dispatch(getHomePageFail(error));
    });
};

export const trackUserStart = () => ({
  type: TRACK_USER_START,
});

export const trackUserSuccess = () => ({
  type: TRACK_USER_SUCCESS,
});

export const trackUserFail = error => ({
  type: TRACK_USER_FAIL,
  error,
});

export const trackUser = () => (dispatch, getState) => {
  if (!getState().user.isAuthorized) { return; }

  const { cid } = getState().user;
  dispatch(trackUserStart());
  axios
    .post('/api/logging/recordUserAction', {
      cid,
      actionId: 'pagevisit',
      featureId: 'home',
    })
    .then(() => {
      dispatch(trackUserSuccess());
    })
    .catch((error) => {
      dispatch(trackUserFail(error));
    });
};
