import axios from 'axios';
import { fetchMissionCount, fetchMyPicturesCount } from '../my-pictures/actions';
import { fetchGalleriesCount } from '../my-pictures-galleries/actions';
import { fetchMyPicturesImageDetails } from '../my-pictures-image-details/actions';


export const FETCH_GALLERY_PICS_START = 'FETCH_GALLERY_PICS_START';
export const FETCH_GALLERY_PICS_SUCCESS = 'FETCH_GALLERY_PICS_SUCCESS';
export const FETCH_GALLERY_PICS_FAIL = 'FETCH_GALLERY_PICS_FAIL';
export const FETCH_GALLERY_PICS_COUNT_START = 'FETCH_GALLERY_PICS_COUNT_START';
export const FETCH_GALLERY_PICS_COUNT_SUCCESS = 'FETCH_GALLERY_PICS_COUNT_SUCCESS';
export const FETCH_GALLERY_PICS_COUNT_FAIL = 'FETCH_GALLERY_PICS_COUNT_FAIL';

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
  timeFilter,
  tagFilters,
  dateFilter,
  filterType,
  maxImageCount,
  firstImageNumber,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
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
    timeFilter,
    tagFilters,
    dateFilter,
    filterType,
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
  dispatch(fetchGalleryPicsCountStart());
  return axios.post('/api/images/getGalleryPicturesCount', {
    // at: 3, // for testing purposes
    // cid: 185651, // for testing purposes
    // token: 'ff278b57d3724d41a3d48194e2f29526b30e9c0f', // for testing purposes
    at,
    cid,
    token,
    galleryId,
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
