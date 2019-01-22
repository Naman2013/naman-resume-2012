import { fetchPrivateProfileDataService } from '../../services/profile';

export const FETCH_PRIVATE_PROFILE_START = 'FETCH_PRIVATE_PROFILE_START';
export const FETCH_PRIVATE_PROFILE_SUCCESS = 'FETCH_PRIVATE_PROFILE_SUCCESS';
export const FETCH_PRIVATE_PROFILE_FAILURE = 'FETCH_PRIVATE_PROFILE_FAILURE';

const fetchPrivateProfileStart = () => ({
  type: FETCH_PRIVATE_PROFILE_START,
});

const fetchPrivateProfileSuccess = payload => ({
  type: FETCH_PRIVATE_PROFILE_SUCCESS,
  payload,
});

const fetchPrivateProfileFailure = payload => ({
  type: FETCH_PRIVATE_PROFILE_FAILURE,
  payload,
});

export const fetchPrivateProfile = ({ lang, ver }) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchPrivateProfileStart());

  return fetchPrivateProfileDataService({
    lang,
    ver,
    at,
    token,
    cid,
  })
    .then(result => dispatch(fetchPrivateProfileSuccess(result.data)))
    .catch(error => dispatch(fetchPrivateProfileFailure(error)));
};
