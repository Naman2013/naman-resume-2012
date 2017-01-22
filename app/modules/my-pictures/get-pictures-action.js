import axios from 'axios';

const ROOT_API = '/api/images/getMyPictures';

export const FETCH_PICTURES_START = 'FETCH_PICTURES_START';
export const FETCH_PICTURES_SUCCESS = 'FETCH_PICTURES_SUCCESS';
export const FETCH_PICTURES_FAIL = 'FETCH_PICTURES_FAIL';

export const FETCH_PHOTO_ROLL_START = 'FETCH_PHOTO_ROLL_START';
export const FETCH_PHOTO_ROLL_SUCCESS = 'FETCH_PHOTO_ROLL_SUCCESS';
export const FETCH_PHOTO_ROLL_FAIL = 'FETCH_PHOTO_ROLL_FAIL';

export const FETCH_MISSIONS_START = 'FETCH_MISSIONS_START';
export const FETCH_MISSIONS_SUCCESS = 'FETCH_MISSIONS_SUCCESS';
export const FETCH_MISSIONS_FAIL = 'FETCH_MISSIONS_FAIL';

const fetchMissionsStart = () => ({
  type: FETCH_MISSIONS_START,
});

const fetchMissionsSuccess = payload => ({
  type: FETCH_MISSIONS_SUCCESS,
  payload,
});

const fetchMissionsFail = payload => ({
  type: FETCH_MISSIONS_FAIL,
  payload,
});

export const fetchMissions = ({ filterType } = {}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchMissionsStart());

  return axios.post('/api/images/getMissionImages', {
    token,
    at,
    cid,
    filterType,
  })
  .then(result => dispatch(fetchMissionsSuccess(result.data)))
  .catch(error => dispatch(fetchMissionsFail(error)));
};

const fetchPhotoRollStart = () => ({
  type: FETCH_PHOTO_ROLL_START,
});

const fetchPhotoRollSuccess = payload => ({
  type: FETCH_PHOTO_ROLL_SUCCESS,
  payload,
});

const fetchPhotoRollFail = payload => ({
  type: FETCH_PHOTO_ROLL_FAIL,
  payload,
});

export const fetchPhotoRoll = ({ filterType, scheduledMissionId }) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchPhotoRollStart());
  const viewType = scheduledMissionId ? 'missions' : 'photoRoll';

  return axios.post(ROOT_API, {
    at,
    cid,
    token,
    filterType,
    scheduledMissionId,
    viewType,
  })
  .then(result => dispatch(fetchPhotoRollSuccess(result.data)))
  .catch(error => dispatch(fetchPhotoRollFail(error)));
};


const fetchPicturesStart = () => ({
  type: FETCH_PICTURES_START,
});

const fetchPicturesSuccess = payload => ({
  type: FETCH_PICTURES_SUCCESS,
  payload,
});

const fetchPicturesFail = payload => ({
  type: FETCH_PICTURES_FAIL,
  payload,
});

export const fetchPictures = (viewType, scheduledMissionId) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;

  dispatch(fetchPicturesStart());

  return axios.post('/api/images/getMyPictures', {
    cid,
    at,
    token,
    viewType,
    scheduledMissionId,
  })
    .then(result => dispatch(fetchPicturesSuccess(result.data)))
    .catch(error => dispatch(fetchPicturesFail(error)));
};

export const fetchMissionPictures = () => (dispatch, getState) => {
  const { cid, at, token } = getState().user;

  dispatch(fetchPicturesStart());

  return axios.post('/api/images/getMissionImages', {
    cid,
    at,
    token,
  })
    .then(result => dispatch(fetchPicturesSuccess(result.data)))
    .catch(error => dispatch(fetchPicturesFail(error)));
};
