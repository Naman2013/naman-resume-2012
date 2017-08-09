import axios from 'axios';

export const CREATE_GALLERY_START = 'CREATE_GALLERY_START';
export const CREATE_GALLERY_SUCCESS = 'CREATE_GALLERY_SUCCESS';
export const CREATE_GALLERY_FAIL = 'CREATE_GALLERY_FAIL';

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
