import axios from 'axios';

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

export const fetchMissionPhotos = scheduledMissionId => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { objectTypeFilter } = getState().myPictures;
  dispatch(fetchMissionPhotosStart());

  return axios.post('/api/images/getMyPictures', {
    at,
    cid,
    token,
    scheduledMissionId,
    filterType: objectTypeFilter.filterByField,
    viewType: 'missions',
  })
  .then(result => dispatch(fetchMissionPhotosSuccess(result.data)))
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

const fetchMissions = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { objectTypeFilter } = getState().myPictures;
  dispatch(fetchMissionsStart());

  return axios.post('/api/images/getMissionImages', {
    token,
    at,
    cid,
    filterType: objectTypeFilter.filterByField,
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

/**
  @scheduledMissionId: number - used when filtering down to a specific set
  of photographs for a specific mission
*/
export const fetchPhotoRoll = ({ noFilter = false }) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { objectTypeFilter } = getState().myPictures;
  dispatch(fetchPhotoRollStart());

  return axios.post('/api/images/getMyPictures', {
    at,
    cid,
    token,
    filterType: noFilter ? '' : objectTypeFilter.filterByField,
    viewType: 'photoRoll',
  })
  .then(result => dispatch(fetchPhotoRollSuccess(result.data)))
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

export const fetchPhotoRollandMissionRoll = () => (dispatch) => {
  dispatch(fetchMissions());
  dispatch(fetchPhotoRoll({}));
};

export const updateObjectFilterBy = (payload, page) => (dispatch) => {
  dispatch(setObjectFilterBy(payload));
  dispatch(fetchMissions());
  dispatch(fetchPhotoRoll({}));
};

export const resetObjectFilter = page => (dispatch) => {
  dispatch(resetObjectTypeFilter());
  dispatch(fetchMissions());
  dispatch(fetchPhotoRoll({}));

};
