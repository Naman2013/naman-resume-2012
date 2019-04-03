import axios from 'axios';
import { fetchMyPicturesCount, fetchMissionCount } from '../my-pictures/actions';

export const CREATE_GALLERY_START = 'CREATE_GALLERY_START';
export const CREATE_GALLERY_SUCCESS = 'CREATE_GALLERY_SUCCESS';
export const CREATE_GALLERY_FAIL = 'CREATE_GALLERY_FAIL';

export const FETCH_GALLERIES_START = 'FETCH_GALLERIES_START';
export const FETCH_GALLERIES_SUCCESS = 'FETCH_GALLERIES_SUCCESS';
export const FETCH_GALLERIES_FAIL = 'FETCH_GALLERIES_FAIL';

export const FETCH_GALLERIES_COUNT_START = 'FETCH_GALLERIES_COUNT_START';
export const FETCH_GALLERIES_COUNT_SUCCESS = 'FETCH_GALLERIES_COUNT_SUCCESS';
export const FETCH_GALLERIES_COUNT_FAIL = 'FETCH_GALLERIES_COUNT_FAIL';

export const FETCH_MORE_GALLERIES_SUCCESS = 'FETCH_MORE_GALLERIES';

const createGalleryStart = payload => ({
  type: CREATE_GALLERY_START,
  payload,
});

const createGallerySuccess = payload => ({
  type: CREATE_GALLERY_SUCCESS,
  payload,
});

const createGalleryFail = payload => ({
  type: CREATE_GALLERY_FAIL,
  payload,
});

export const createGallery = ({
  title,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(createGalleryStart());
  return axios.post('/api/images/createGallery', {
    // at: 3, // for testing purposes
    // cid: 185651, // for testing purposes
    // token: 'ff278b57d3724d41a3d48194e2f29526b30e9c0f', // for testing purposes
    at,
    cid,
    token,
    title,
  })
  .then(result => dispatch(createGallerySuccess(Object.assign(result.data, { title }))))
  .catch(error => dispatch(createGalleryFail(error)));
};

const fetchGalleriesStart = () => ({
  type: FETCH_GALLERIES_START,
});

const fetchGalleriesSuccess = payload => ({
  type: FETCH_GALLERIES_SUCCESS,
  payload,
});

const fetchGalleriesFail = payload => ({
  type: FETCH_GALLERIES_FAIL,
  payload,
});

export const fetchGalleries = ({
  maxImageCount = 9,
  firstImageNumber = 1,
  pagingMode = 'app',
  noFilters = false,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { selectedFilters } = getState().myPicturesFilters;
  const filters = noFilters ? {} : selectedFilters;
  dispatch(fetchGalleriesStart());
  // dispatch(fetchGalleriesCount({})); // for pagination
  // dispatch(fetchMissionCount()); // for deeplinking
  // dispatch(fetchMyPicturesCount());// for deeplinking
  return axios.post('/api/images/getGalleryList', {
    // at: 3, // for testing purposes
    // cid: 185651, // for testing purposes
    // token: 'ff278b57d3724d41a3d48194e2f29526b30e9c0f', // for testing purposes
    at,
    cid,
    token,
    pagingMode,
    maxGalleryCount: maxImageCount,
    firstGalleryNumber: firstImageNumber,
    ...filters,
  })
  .then(result => dispatch(fetchGalleriesSuccess(result.data)))
  .catch(error => dispatch(fetchGalleriesFail(error)));
};

const fetchGalleriesCountStart = payload => ({
  type: FETCH_GALLERIES_COUNT_START,
  payload,
});

const fetchGalleriesCountSuccess = payload => ({
  type: FETCH_GALLERIES_COUNT_SUCCESS,
  payload,
});

const fetchGalleriesCountFail = payload => ({
  type: FETCH_GALLERIES_COUNT_FAIL,
  payload,
});

export const fetchGalleriesCount = ({ customerUUID }) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { selectedFilters } = getState().myPicturesFilters;
  dispatch(fetchGalleriesCountStart());

  return axios.post('/api/images/getGalleryCount', {
    // at: 3, // for testing purposes
    // cid: 185651, // for testing purposes
    // token: 'ff278b57d3724d41a3d48194e2f29526b30e9c0f', // for testing purposes
    at,
    cid,
    token,
    customerUUID,
    ...selectedFilters,
  })
  .then(result => {
    if (result.apiError) {
      dispatch(fetchGalleriesCountFail(result));
    } else {
      dispatch(fetchGalleriesCountSuccess(result.data))
    }
  })
  .catch(error => dispatch(fetchGalleriesCountFail(error)));
};

export const fetchGalleriesAndCounts = (params) => (dispatch) => {
  dispatch(fetchMissionCount(params));
  dispatch(fetchMyPicturesCount(params));
  dispatch(fetchGalleriesCount(params));
  dispatch(fetchGalleries(params));
};

const fetchMoreGalleriesSuccess = payload => ({
  type: FETCH_MORE_GALLERIES_SUCCESS,
  payload,
});

export const fetchMoreGalleries = ({
  maxImageCount = 10,
  firstImageNumber = 11,
  pagingMode = 'app',
  noFilters = false,
  customerUUID,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { selectedFilters } = getState().myPicturesFilters;
  const filters = noFilters ? {} : selectedFilters;
  return axios.post('/api/images/getGalleryList', {
    at,
    cid,
    token,
    pagingMode,
    maxGalleryCount: maxImageCount,
    firstGalleryNumber: firstImageNumber,
    customerUUID,
    ...filters,
  })
  .then(result => dispatch(fetchMoreGalleriesSuccess(result.data)))
  .catch(error => dispatch(fetchGalleriesFail(error)));
};
