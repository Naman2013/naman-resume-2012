import axios from 'axios';

export const ADD_IMAGE_TO_GALLERY_START = 'ADD_IMAGE_TO_GALLERY_START';
export const ADD_IMAGE_TO_GALLERY_SUCCESS = 'ADD_IMAGE_TO_GALLERY_SUCCESS';
export const ADD_IMAGE_TO_GALLERY_FAIL = 'ADD_IMAGE_TO_GALLERY_FAIL';
export const RESET_ADD_RESPONSE = 'RESET_ADD_RESPONSE';

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
  const { token, cid, at } = getState().user;
  dispatch(addImageToGalleryStart());
  return axios.post('/api/images/addImageToGallery', {
    at,
    cid,
    token,
    galleryId,
    customerImageId,
  })
    .then(result => dispatch(addImageToGallerySuccess(
      Object.assign(result.data, { galleryId, customerImageId })
    )))
    .catch(error => dispatch(addImageToGalleryFail(error)));
};

export const resetAddResponse = () => ({
  type: RESET_ADD_RESPONSE
});
