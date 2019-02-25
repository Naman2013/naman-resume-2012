import axios from 'axios';

export const FETCH_PUBLIC_PROFILE_START = 'FETCH_PUBLIC_PROFILE_START';
export const FETCH_PUBLIC_PROFILE_SUCCESS = 'FETCH_PUBLIC_PROFILE_SUCCESS';
export const FETCH_PUBLIC_PROFILE_FAILURE = 'FETCH_PUBLIC_PROFILE_FAILURE';

export const fetchPublicProfile = ({
  lang,
  ver,
  customerId,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchPublicProfileStart());
  return axios.post('/api/page/getPublicProfile', {
    lang,
    customerId,
    ver,
    at,
    token,
    cid,
  })
    .then(result => dispatch(fetchPublicProfileSuccess(result.data)))
    .catch(error => dispatch(fetchPublicProfileFailure(error)));
};

const fetchPublicProfileStart = () => ({
  type: FETCH_PUBLIC_PROFILE_START,
});

const fetchPublicProfileSuccess = payload => ({
  type: FETCH_PUBLIC_PROFILE_SUCCESS,
  payload,
});

const fetchPublicProfileFailure = payload => ({
  type: FETCH_PUBLIC_PROFILE_FAILURE,
  payload,
});
