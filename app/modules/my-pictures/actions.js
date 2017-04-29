import axios from 'axios';
import getMissionFits from '../../services/pictures/get-mission-fits';

export const FETCH_PHOTO_ROLL_START = 'FETCH_PHOTO_ROLL_START';
export const FETCH_PHOTO_ROLL_SUCCESS = 'FETCH_PHOTO_ROLL_SUCCESS';
export const FETCH_PHOTO_ROLL_FAIL = 'FETCH_PHOTO_ROLL_FAIL';

export const FETCH_MISSION_PHOTOS_START = 'FETCH_MISSION_PHOTOS_START';
export const FETCH_MISSION_PHOTOS_SUCCESS = 'FETCH_MISSION_PHOTOS_SUCCESS';
export const FETCH_MISSION_PHOTOS_FAIL = 'FETCH_MISSION_PHOTOS_FAIL';

export const FETCH_MISSIONS_START = 'FETCH_MISSIONS_START';
export const FETCH_MISSIONS_SUCCESS = 'FETCH_MISSIONS_SUCCESS';
export const FETCH_MISSIONS_FAIL = 'FETCH_MISSIONS_FAIL';

export const UPDATE_BY_OBJECT_FILTER = 'UPDATE_BY_OBJECT_FILTER';
export const RESET_OBJECT_TYPE_FILTER = 'RESET_OBJECT_TYPE_FILTER';

export const UPDATE_SCHEDULE_MISSION_ID = 'UPDATE_SCHEDULE_MISSION_ID';
export const RESET_SCHEDULE_MISSION_ID = 'RESET_SCHEDULE_MISSION_ID';

export const FETCH_FIT_IMAGES_START = 'FETCH_FIT_IMAGES_START';
export const FETCH_FIT_IMAGES_SUCCESS = 'FETCH_FIT_IMAGES_SUCCESS';
export const RESET_FIT_IMAGES = 'RESET_FIT_IMAGES';

export const FETCH_MY_PICTURES_COUNT_START = 'FETCH_MY_PICTURES_COUNT_START';
export const FETCH_MY_PICTURES_COUNT_SUCCESS = 'FETCH_MY_PICTURES_COUNT_SUCCESS';
export const FETCH_MY_PICTURES_COUNT_FAIL = 'FETCH_MY_PICTURES_COUNT_FAIL';

export const FETCH_MISSION_PHOTOS_COUNT_START = 'FETCH_MISSION_PHOTOS_COUNT_START';
export const FETCH_MISSION_PHOTOS_COUNT_SUCCESS = 'FETCH_MISSION_PHOTOS_COUNT_SUCCESS';
export const FETCH_MISSION_PHOTOS_COUNT_FAIL = 'FETCH_MISSION_PHOTOS_COUNT_FAIL';


export const FETCH_MISSION_COUNT_START = 'FETCH_MISSION_COUNT_START';
export const FETCH_MISSION_COUNT_SUCCESS = 'FETCH_MISSION_COUNT_SUCCESS';
export const FETCH_MISSION_COUNT_FAIL = 'FETCH_MISSION_COUNT_FAIL';



const fetchFITImagesStart = () => ({
  type: FETCH_FIT_IMAGES_START,
});

const fetchFITImagesSuccess = payload => ({
  type: FETCH_FIT_IMAGES_SUCCESS,
  payload,
});

export const resetFITImages = () => ({
  type: RESET_FIT_IMAGES,
});

export const loadFITImages = ({ scheduledMissionId }) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchFITImagesStart());
  return getMissionFits({
    cid,
    at,
    token,
    scheduledMissionId,
  })
  .then(result => dispatch(fetchFITImagesSuccess(result.data)))
  .catch(error => () => { throw error; });
};

const fetchMissionPhotosStart = () => ({
  type: FETCH_MISSION_PHOTOS_START,
});

const fetchMissionPhotosSuccess = payload => ({
  type: FETCH_MISSION_PHOTOS_SUCCESS,
  payload,
});

const fetchMissionPhotosFail = payload => ({
  type: FETCH_MISSION_PHOTOS_FAIL,
  payload,
});

export const fetchMissionPhotos = ({
  scheduledMissionId,
  maxImageCount,
  firstImageNumber,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { objectTypeFilter } = getState().myPictures;
  dispatch(fetchMissionPhotosStart());
  dispatch(fetchMissionPhotosCount()); // for pagination

  return axios.post('/api/images/getMyPictures', {
    at,
    cid,
    token,
    pagingMode: 'api',
    maxImageCount,
    firstImageNumber,
    scheduledMissionId,
    filterType: objectTypeFilter.filterByField,
    viewType: 'missions',
  })
  .then(result => dispatch(fetchMissionPhotosSuccess(
    Object.assign({
      maxImageCount,
      firstImageNumber,
    }, result.data))))
  .catch(error => dispatch(fetchMissionPhotosFail(error)));
};

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

const fetchMissions = ({
  firstMissionNumber,
  maxMissionCount,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { objectTypeFilter } = getState().myPictures;
  dispatch(fetchMissionsStart());

  return axios.post('/api/images/getMissionImages', {
    token,
    at,
    cid,
    pagingMode: 'api',
    firstMissionNumber,
    maxMissionCount,
    filterType: objectTypeFilter.filterByField,
  })
  .then(result => dispatch(fetchMissionsSuccess(
    Object.assign({
      firstMissionNumber,
      maxMissionCount,
    }, result.data)
  )))
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

/**
  @scheduledMissionId: number - used when filtering down to a specific set
  of photographs for a specific mission
*/
export const fetchPhotoRoll = ({
  noFilter = false,
  maxImageCount,
  firstImageNumber,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { objectTypeFilter } = getState().myPictures;
  dispatch(fetchPhotoRollStart());

  return axios.post('/api/images/getMyPictures', {
    at,
    cid,
    token,
    pagingMode: 'api',
    maxImageCount,
    firstImageNumber,
    filterType: noFilter ? '' : objectTypeFilter.filterByField,
    viewType: 'photoRoll',
  })
  .then(result => dispatch(fetchPhotoRollSuccess(
    Object.assign({
      maxImageCount,
      firstImageNumber,
    }, result.data))))
  .catch(error => dispatch(fetchPhotoRollFail(error)));
};

const setObjectFilterBy = payload => ({
  type: UPDATE_BY_OBJECT_FILTER,
  payload,
});

const resetObjectTypeFilter = () => ({
  type: RESET_OBJECT_TYPE_FILTER,
});

const setScheduledMissionId = payload => ({
  type: UPDATE_SCHEDULE_MISSION_ID,
  payload,
});

const resetScheduledMissionId = () => ({
  type: RESET_SCHEDULE_MISSION_ID,
});

export const photoRollUpdateScheduledMissionId = payload => (dispatch) => {
  dispatch(setScheduledMissionId(payload));
  dispatch(fetchPhotoRoll({}));
};

export const photoRollResetScheduledMissionId = () => (dispatch) => {
  dispatch(resetScheduledMissionId());
  dispatch(fetchPhotoRoll({}));
};

/**
  @page = 'missions' 'photoRoll'
  used to refresh the appropriate set of images in the state.

  TODO: refactor to reduce repeated checks for the same values
  TODO: consider creating system constants that we can use to import and use for
  checks in other parts of the app to stay consistent.
*/

export const fetchPhotoRollAndCounts = () => (dispatch) => {
  dispatch(fetchMissionCount());
  dispatch(fetchMyPicturesCount());
  dispatch(fetchPhotoRoll({}));
};

export const fetchMissionsAndCounts = () => (dispatch) => {
  dispatch(fetchMissionCount());
  dispatch(fetchMyPicturesCount());
  dispatch(fetchMissions({}));
};

export const updateObjectFilterBy = (payload, page) => (dispatch) => {
  dispatch(setObjectFilterBy(payload));
  dispatch(fetchMissionCount());
  dispatch(fetchMyPicturesCount());

  if (page === 'photoRoll') {
    dispatch(fetchPhotoRoll({}));
  } else if (page === 'missions') {
    dispatch(fetchMissions());
  }
};

export const resetObjectFilter = page => (dispatch) => {
  dispatch(resetObjectTypeFilter());
  dispatch(fetchMissionCount());
  dispatch(fetchMyPicturesCount());

  if (page === 'photoRoll') {
    dispatch(fetchPhotoRoll({}));
  } else if (page === 'missions') {
    dispatch(fetchMissions());
  }

};

const fetchMyPicturesCountStart = payload => ({
  type: FETCH_MY_PICTURES_COUNT_START,
  payload,
});

const fetchMyPicturesCountSuccess = payload => ({
  type: FETCH_MY_PICTURES_COUNT_SUCCESS,
  payload,
});

const fetchMyPicturesCountFail = payload => ({
  type: FETCH_MY_PICTURES_COUNT_FAIL,
  payload,
});

export const fetchMyPicturesCount = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { objectTypeFilter } = getState().myPictures;
  dispatch(fetchMyPicturesCountStart());

  return axios.post('/api/images/getMyPicturesCount', {
    at,
    cid,
    token,
    filterType: objectTypeFilter.filterByField,
    viewType: 'photoRoll',
  })
  .then(result => dispatch(fetchMyPicturesCountSuccess(result.data)))
  .catch(error => dispatch(fetchMyPicturesCountFail(error)));
};

const fetchMissionPhotosCountStart = payload => ({
  type: FETCH_MISSION_PHOTOS_COUNT_START,
  payload,
});

const fetchMissionPhotosCountSuccess = payload => ({
  type: FETCH_MISSION_PHOTOS_COUNT_SUCCESS,
  payload,
});

const fetchMissionPhotosCountFail = payload => ({
  type: FETCH_MISSION_PHOTOS_COUNT_FAIL,
  payload,
});

export const fetchMissionPhotosCount = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { objectTypeFilter } = getState().myPictures;
  dispatch(fetchMissionPhotosCountStart());

  return axios.post('/api/images/getMyPicturesCount', {
    at,
    cid,
    token,
    filterType: objectTypeFilter.filterByField,
    viewType: 'missions',
  })
  .then(result => dispatch(fetchMissionPhotosCountSuccess(result.data)))
  .catch(error => dispatch(fetchMissionPhotosCountFail(error)));
};

const fetchMissionCountStart = payload => ({
  type: FETCH_MISSION_COUNT_START,
  payload,
});

const fetchMissionCountSuccess = payload => ({
  type: FETCH_MISSION_COUNT_SUCCESS,
  payload,
});

const fetchMissionCountFail = payload => ({
  type: FETCH_MISSION_COUNT_FAIL,
  payload,
});

export const fetchMissionCount = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { objectTypeFilter } = getState().myPictures;
  dispatch(fetchMissionCountStart());

  return axios.post('/api/images/getMissionCount', {
    at,
    cid,
    token,
    filterType: objectTypeFilter.filterByField,
  })
  .then(result => dispatch(fetchMissionCountSuccess(result.data)))
  .catch(error => dispatch(fetchMissionCountFail(error)));
};
