import { API } from 'app/api';
import cookie from 'cookie';
import { store } from '../User';

export const UPLOAD_AVATAR_START = 'UPLOAD_AVATAR_START';
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
export const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE';
export const SET_AVATAR_START = 'SET_AVATAR_START';
export const SET_AVATAR_SUCCESS = 'SET_AVATAR_SUCCESS';
export const SET_AVATAR_FAILURE = 'SET_AVATAR_FAILURE';
export const CLEAR_AVATAR_DATA = 'CLEAR_AVATAR_DATA';

const uploadAvatarStart = () => ({
  type: UPLOAD_AVATAR_START,
});

const uploadAvatarSuccess = payload => ({
  type: UPLOAD_AVATAR_SUCCESS,
  payload,
});

const uploadAvatarFailure = payload => ({
  type: UPLOAD_AVATAR_FAILURE,
  payload,
});

export const uploadAvatar = data => (dispatch, getState) => {
  dispatch(uploadAvatarStart());
  return API({
    method: 'post',
    url: '/api/users/uploadAvatar',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
    .then(result => dispatch(uploadAvatarSuccess(result.data)))
    .catch(error => dispatch(uploadAvatarFailure(error)));
};

const setAvatarStart = () => ({
  type: SET_AVATAR_START,
});

const setAvatarSuccess = payload => ({
  type: SET_AVATAR_SUCCESS,
  payload,
});

const setAvatarFailure = payload => ({
  type: SET_AVATAR_FAILURE,
  payload,
});

export const setAvatar = ({ lang, ver, imageURL }) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(setAvatarStart());
  return API
      .post('/api/users/setAvatar', {
      at,
      token,
      cid,
      lang,
      ver,
      imageURL,
    })
    .then(result => {
      // if set avatar was successful,
      // update browser cookie and User store with correct avatar url
      if (!result.data.apiError) {
        const cookies = cookie.parse(window.document.cookie || '');
        // const avatarURL = result.data.imageURL.split('\\').pop().split('/').pop();
        dispatch(
          store({
            cid: cookies.cid,
            at: cookies.at,
            token: cookies.token,
            fname: cookies.fname,
            avatarURL: result.data.imageURL,
            radioDefaultVolume: cookies.radioDefaultVolume,
            radioDefaultMute: cookies.radioDefaultMute,
          })
        );
      }
      return dispatch(setAvatarSuccess(result.data));
    })
    .catch(error => dispatch(setAvatarFailure(error)));
};

export const clearAvatarData = () => ({
  type: CLEAR_AVATAR_DATA,
});
