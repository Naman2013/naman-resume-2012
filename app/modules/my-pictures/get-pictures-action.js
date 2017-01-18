import axios from 'axios';

export const FETCH_PICTURES_START = 'FETCH_PICTURES_START';
export const FETCH_PICTURES_SUCCESS = 'FETCH_PICTURES_SUCCESS';
export const FETCH_PICTURES_FAIL = 'FETCH_PICTURES_FAIL';


const fetchPicturesStart = () => ({
  type: FETCH_PICTURES_START,
});

const fetchPicturesSuccess = (payload) => ({
  type: FETCH_PICTURES_SUCCESS,
  payload,
});

const fetchPicturesFail = (payload) => ({
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

