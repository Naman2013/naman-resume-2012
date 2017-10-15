import axios from 'axios';

export const FETCH_USER_PUBLIC_GALLERIES_START = 'FETCH_USER_PUBLIC_GALLERIES_START';
export const FETCH_USER_PUBLIC_GALLERIES_SUCCESS = 'FETCH_USER_PUBLIC_GALLERIES_SUCCESS';
export const FETCH_USER_PUBLIC_GALLERIES_FAIL = 'FETCH_USER_PUBLIC_GALLERIES_FAIL';


const fetchUserPublicGalleriesStart = () => ({
  type: FETCH_USER_PUBLIC_GALLERIES_START,
});

const fetchUserPublicGalleriesSuccess = payload => ({
  type: FETCH_USER_PUBLIC_GALLERIES_SUCCESS,
  payload,
});

const fetchUserPublicGalleriesFail = payload => ({
  type: FETCH_USER_PUBLIC_GALLERIES_FAIL,
  payload,
});

export const fetchUserPublicGalleries = ({
  maxImageCount = 9,
  firstImageNumber = 1,
  pagingMode = 'app',
  cid,
}) => (dispatch, getState) => {
  dispatch(fetchUserPublicGalleriesStart());
  return axios.post('/api/images/getPublicGalleryList', {
    cid,
    pagingMode,
    maxGalleryCount: maxImageCount,
    firstGalleryNumber: firstImageNumber,
  })
  .then(result => dispatch(fetchUserPublicGalleriesSuccess(result.data)))
  .catch(error => dispatch(fetchUserPublicGalleriesFail(error)));
};
