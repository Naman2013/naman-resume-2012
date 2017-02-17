import axios from 'axios';

export const FETCH_SETTINGS_START = 'FETCH_SETTINGS_START';
export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS';
export const FETCH_SETTINGS_FAIL = 'FETCH_SETTINGS_FAIL';

const fetchSettingsStart = () => ({
  type: FETCH_SETTINGS_START,
});

const fetchSettingsSuccess = payload => ({
  type: FETCH_SETTINGS_SUCCESS,
  payload,
});

const fetchSettingsFail = payload => ({
  type: FETCH_SETTINGS_FAIL,
  payload,
});

export const fetchMashupSettings = pageName => (dispatch) => {
  dispatch(fetchSettingsStart());
  return axios.post('/api/social/getMashupSettings', {
    pageName,
  })
  .then(result => dispatch(fetchSettingsSuccess(result.data)))
  .catch(error => dispatch(fetchSettingsFail(error)));
};
