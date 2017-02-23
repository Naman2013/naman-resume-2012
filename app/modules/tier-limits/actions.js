import axios from 'axios';

export const FETCH_TIER_LIMITS_START = 'FETCH_TIER_LIMITS_START';
export const FETCH_TIER_LIMITS_SUCCESS = 'FETCH_TIER_LIMITS_SUCCESS';
export const FETCH_TIER_LIMITS_FAILURE = 'FETCH_TIER_LIMITS_FAILURE';

const fetchTierLimitsStart = () => ({
  type: FETCH_TIER_LIMITS_START,
});

const fetchTierLimitsSuccess = payload => ({
  type: FETCH_TIER_LIMITS_SUCCESS,
  payload,
});

const fetchTierLimitsFailure = payload => ({
  type: FETCH_TIER_LIMITS_FAILURE,
  payload,
});

export const fetchTierLimits = ({
  lang,
  ver,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchTierLimitsStart());
  return axios.post('/api/settings/checkTierLimits', {
    lang,
    ver,
    at,
    token,
    cid,
  })
    .then(result => dispatch(fetchTierLimitsSuccess(result.data)))
    .catch(error => dispatch(fetchTierLimitsFailure(error)));
};
