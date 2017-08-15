import axios from 'axios';

export const ADD_IMAGE_TO_GALLERY_START = 'ADD_IMAGE_TO_GALLERY_START';
export const ADD_IMAGE_TO_GALLERY_SUCCESS = 'ADD_IMAGE_TO_GALLERY_SUCCESS';
export const ADD_IMAGE_TO_GALLERY_FAIL = 'ADD_IMAGE_TO_GALLERY_FAIL';

const addImageToGalleryStart = payload => ({
  type: ADD_IMAGE_TO_GALLERY_START,
  payload,
});

const addImageToGallerySuccess = payload => ({
  type: ADD_IMAGE_TO_GALLERY_SUCCESS,
  payload,
});

const addImageToGalleryFail = payload => ({
  type: ADD_IMAGE_TO_GALLERY_FAIL,
  payload,
});

export const addImageToGallery = ({
  galleryId,
  customerImageId,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(addImageToGalleryStart());

  return axios.post('/api/images/addImageToGallery', {
    // at: 3, // for testing purposes
    // cid: 185651, // for testing purposes
    // token: 'ff278b57d3724d41a3d48194e2f29526b30e9c0f', // for testing purposes
    at,
    cid,
    token,
    galleryId,
    customerImageId,
  })
  .then(result => dispatch(addImageToGallerySuccess(result.data)))
  .catch(error => dispatch(addImageToGalleryFail(error)));
};
