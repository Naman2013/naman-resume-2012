import { ACTION } from './reducer';
import { getGalleryDetailsApi } from './api';

export const getGalleryDetails = galleryId => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(ACTION.getGalleryDetails());
  const body = {
    at,
    token,
    cid,
    galleryId,
  };
  return getGalleryDetailsApi(body)
    .then(result => dispatch(ACTION.getGalleryDetailsSuccess(result.data)))
    .catch(error => dispatch(ACTION.getGalleryDetailsError(error)));
};
