import axios from 'axios';
import { fetchMissionCount, fetchMyPicturesCount, fetchGalleriesCount } from '../my-pictures/actions';

export const FETCH_GALLERY_START = 'FETCH_GALLERY_START';
export const FETCH_GALLERY_SUCCESS = 'FETCH_GALLERY_SUCCESS';
export const FETCH_GALLERY_FAIL = 'FETCH_GALLERY_FAIL';

const fetchGalleryPicturesStart = payload => ({
  type: FETCH_GALLERY_START,
  payload,
});

const fetchGalleryPicturesSuccess = payload => ({
  type: FETCH_GALLERY_SUCCESS,
  payload,
});

const fetchGalleryPicturesFail = payload => ({
  type: FETCH_GALLERY_FAIL,
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

  return axios.post('/api/images/getGalleryPictures', {
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
  .then(result => dispatch(fetchGalleryPicturesSuccess(result.data)))
  .catch(error => dispatch(fetchGalleryPicturesFail(error)));
};

export const fetchImageDetailsAndCounts = params => (dispatch) => {
  dispatch(fetchMissionCount());
  dispatch(fetchMyPicturesCount());
  dispatch(fetchGalleriesCount());// for deeplinking
  dispatch(fetchGalleryPictures({
    ...params,
  }));
};
