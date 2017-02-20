import axios from 'axios';

export const FETCH_APP_CONFIG_START = 'FETCH_APP_CONFIG_START';
export const FETCH_APP_CONFIG_SUCCESS = 'FETCH_APP_CONFIG_SUCCESS';
export const FETCH_APP_CONFIG_FAIL = 'FETCH_APP_CONFIG_FAIL';

const fetchAppConfigStart = () => ({
  type: FETCH_APP_CONFIG_START,
});

const fetchAppConfigSuccess = payload => ({
  type: FETCH_APP_CONFIG_SUCCESS,
  payload,
});

const fetchAppConfigFail = payload => ({
  type: FETCH_APP_CONFIG_FAIL,
  payload,
});

export const fetchAppConfig = ({
  lang,
  ver,
}) => (dispatch, getState) => {
  dispatch(fetchAppConfigStart());
  return axios.get('/api/app/getFooter', {
    ver,
    lang,
  })
  .then(result => dispatch(fetchAppConfigSuccess(result.data)))
  .catch(error => dispatch(fetchAppConfigFail(error)));
};
