import axios from 'axios';
import { fetchMissionCount, fetchMyPicturesCount, fetchGalleriesCount } from '../my-pictures/actions';
import { fetchMyPicturesImageDetails } from '../my-pictures-image-details/actions';


export const FETCH_GALLERY_PICS_START = 'FETCH_GALLERY_PICS_START';
export const FETCH_GALLERY_PICS_SUCCESS = 'FETCH_GALLERY_PICS_SUCCESS';
export const FETCH_GALLERY_PICS_FAIL = 'FETCH_GALLERY_PICS_FAIL';
export const FETCH_GALLERY_PICS_COUNT_START = 'FETCH_GALLERY_PICS_COUNT_START';
export const FETCH_GALLERY_PICS_COUNT_SUCCESS = 'FETCH_GALLERY_PICS_COUNT_SUCCESS';
export const FETCH_GALLERY_PICS_COUNT_FAIL = 'FETCH_GALLERY_PICS_COUNT_FAIL';
export const CREATE_GALLERY_START = 'CREATE_GALLERY_START';
export const CREATE_GALLERY_SUCCESS = 'CREATE_GALLERY_SUCCESS';
export const CREATE_GALLERY_FAIL = 'CREATE_GALLERY_FAIL';

const fetchGalleryPicturesStart = payload => ({
  type: FETCH_GALLERY_PICS_START,
  payload,
});

const fetchGalleryPicturesSuccess = payload => ({
  type: FETCH_GALLERY_PICS_SUCCESS,
  payload,
});

const fetchGalleryPicturesFail = payload => ({
  type: FETCH_GALLERY_PICS_FAIL,
  payload,
});

export const fetchGalleryPictures = ({
  galleryId,
  pagingMode,
  maxImageCount,
  firstImageNumber,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { selectedFilters } = getState().myPicturesFilters
  dispatch(fetchGalleryPicturesStart());
  dispatch(fetchGalleryPicsCount({
    galleryId,
  }));
  return axios.post('/api/images/getGalleryPictures', {
    // at: 3, // for testing purposes
    // cid: 185651, // for testing purposes
    // token: 'ff278b57d3724d41a3d48194e2f29526b30e9c0f', // for testing purposes
    at,
    cid,
    token,
    galleryId,
    pagingMode,
    ...selectedFilters,
    maxImageCount,
    firstImageNumber,
  })
  .then(result => dispatch(fetchGalleryPicturesSuccess(Object.assign({
    maxImageCount,
    firstImageNumber,
  }, result.data))))
  .catch(error => dispatch(fetchGalleryPicturesFail(error)));
};

const fetchGalleryPicsCountStart = payload => ({
  type: FETCH_GALLERY_PICS_COUNT_START,
  payload,
});

const fetchGalleryPicsCountSuccess = payload => ({
  type: FETCH_GALLERY_PICS_COUNT_SUCCESS,
  payload,
});

const fetchGalleryPicsCountFail = payload => ({
  type: FETCH_GALLERY_PICS_COUNT_FAIL,
  payload,
});

export const fetchGalleryPicsCount = ({
  galleryId,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  const { selectedFilters } = getState().myPicturesFilters
  dispatch(fetchGalleryPicsCountStart());
  return axios.post('/api/images/getGalleryPicturesCount', {
    // at: 3, // for testing purposes
    // cid: 185651, // for testing purposes
    // token: 'ff278b57d3724d41a3d48194e2f29526b30e9c0f', // for testing purposes
    at,
    cid,
    token,
    galleryId,
    ...selectedFilters,
  })
  .then(result => dispatch(fetchGalleryPicsCountSuccess(result.data)))
  .catch(error => dispatch(fetchGalleryPicsCountFail(error)));
};

export const fetchGalleryPicturesAndCounts = params => (dispatch) => {
  dispatch(fetchMissionCount());
  dispatch(fetchMyPicturesCount());
  dispatch(fetchGalleriesCount());// for deeplinking
  dispatch(fetchGalleryPictures({
    ...params,
  }));
  dispatch(fetchGalleryPicsCount({
    ...params,
  }));
};

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
  .then(result => dispatch(createGallerySuccess(result.data)))
  .catch(error => dispatch(createGalleryFail(error)));
};
