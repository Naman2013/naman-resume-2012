import axios from 'axios';
import { fetchMissionCount, fetchMyPicturesCount, fetchGalleriesCount } from '../my-pictures/actions';

export const FETCH_MY_PICTURES_IMAGE_DETAILS_START = 'FETCH_MY_PICTURES_IMAGE_DETAILS_START';
export const FETCH_MY_PICTURES_IMAGE_DETAILS_SUCCESS = 'FETCH_MY_PICTURES_IMAGE_DETAILS_SUCCESS';
export const FETCH_MY_PICTURES_IMAGE_DETAILS_FAIL = 'FETCH_MY_PICTURES_IMAGE_DETAILS_FAIL';

const fetchMyPicturesImageDetailsStart = payload => ({
  type: FETCH_MY_PICTURES_IMAGE_DETAILS_START,
  payload,
});

const fetchMyPicturesImageDetailsSuccess = payload => ({
  type: FETCH_MY_PICTURES_IMAGE_DETAILS_SUCCESS,
  payload,
});

const fetchMyPicturesImageDetailsFail = payload => ({
  type: FETCH_MY_PICTURES_IMAGE_DETAILS_FAIL,
  payload,
});

export const fetchMyPicturesImageDetails = ({
  shareToken,
  customerImageId,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchMyPicturesImageDetailsStart());

  return axios.post('/api/images/getImageDetails', {
    at,
    cid,
    token,
    shareToken,
    customerImageId,
  })
  .then(result => dispatch(fetchMyPicturesImageDetailsSuccess(result.data)))
  .catch(error => dispatch(fetchMyPicturesImageDetailsFail(error)));
};

export const fetchImageDetailsAndCounts = params => (dispatch) => {
  dispatch(fetchMissionCount());
  dispatch(fetchMyPicturesCount());
  dispatch(fetchGalleriesCount());// for deeplinking
  dispatch(fetchMyPicturesImageDetails({
    ...params,
  }));
};
