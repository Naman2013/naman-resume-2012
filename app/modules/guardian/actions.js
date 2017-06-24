import axios from 'axios';

export const GUARDIAN_INFO_START = 'GUARDIAN_INFO_START';
export const GUARDIAN_INFO_SUCCESS = 'GUARDIAN_INFO_SUCCESS';
export const GUARDIAN_INFO_FAIL = 'GUARDIAN_INFO_FAIL';

const fetchGuardianInfoStart = () => ({
  type: GUARDIAN_INFO_START,
});

const fetchGuardianInfoSuccess = (payload) => ({
  type: GUARDIAN_INFO_SUCCESS,
  payload,
});

const fetchGuardianInfoFail = (payload) => ({
  type: GUARDIAN_INFO_FAIL,
  payload,
});

export const fetchGuardianInfo = ({ slugLookupId }) => (dispatch, getState) => {
  dispatch(fetchGuardianInfoStart());
  return axios.post('/api/content/getObjectGuardianInfo', {
    slugLookupId,
  })
    .then(result => dispatch(fetchGuardianInfoSuccess(result.data)))
    .catch(error => dispatch(fetchGuardianInfoFail(error)));
};
