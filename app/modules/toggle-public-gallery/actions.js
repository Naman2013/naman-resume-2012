import axios from 'axios';

export const TOGGLE_PUBLIC_GALLERY_START = 'TOGGLE_PUBLIC_GALLERY_START';
export const TOGGLE_PUBLIC_GALLERY_SUCCESS = 'TOGGLE_PUBLIC_GALLERY_SUCCESS';
export const TOGGLE_PUBLIC_GALLERY_FAIL = 'TOGGLE_PUBLIC_GALLERY_FAIL';

const togglePublicGalleryStart = payload => ({
  type: TOGGLE_PUBLIC_GALLERY_START,
  payload,
});

const togglePublicGallerySuccess = payload => ({
  type: TOGGLE_PUBLIC_GALLERY_SUCCESS,
  payload,
});

const togglePublicGalleryFail = payload => ({
  type: TOGGLE_PUBLIC_GALLERY_FAIL,
  payload,
});

export const togglePublicGallery = ({
  galleryId,
}) => (dispatch, getState) => {
  const { token, cid, at } = getState().user;
  dispatch(togglePublicGalleryStart());
  return axios.post('/api/images/toggleGalleryPublic', {
    at,
    cid,
    token,
    galleryId,
  })
    .then(result => dispatch(togglePublicGallerySuccess(
      Object.assign(result.data, { galleryId })
    )))
    .catch(error => dispatch(togglePublicGalleryFail(error)));
};
