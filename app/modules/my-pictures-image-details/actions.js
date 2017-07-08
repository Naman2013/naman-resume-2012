import { fetchMissionCount, fetchMyPicturesCount, fetchGalleriesCount } from '../my-pictures/actions';

export const FETCH_MY_PICTURES_IMAGE_DETAILS_START = 'FETCH_MY_PICTURE_IMAGE_DETAILS_START';
export const FETCH_MY_PICTURES_IMAGE_DETAILS_SUCCESS = 'FETCH_MY_PICTURE_IMAGE_DETAILS_SUCCESS';
export const FETCH_MY_PICTURES_IMAGE_DETAILS_FAIL = 'FETCH_MY_PICTURE_IMAGE_DETAILS_FAIL';

const fetchMyPicturesImageDetailstStart = payload => ({
  type: FETCH_MY_PICTURES_IMAGE_DETAILS_START,
  payload,
});

const fetchMyPicturesImageDetailstSuccess = payload => ({
  type: FETCH_MY_PICTURES_IMAGE_DETAILS_SUCCESS,
  payload,
});

const fetchMyPicturesImageDetailstFail = payload => ({
  type: FETCH_MY_PICTURES_IMAGE_DETAILS_FAIL,
  payload,
});

export const fetchMyPicturesImageDetails = ({
  shareToken,
  customerImageId,
}) => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchMyPicturesImageDetailstStart());

  return axios.post('/api/images/getImageDetails', {
    at,
    cid,
    token,
    shareToken,
    customerImageId,
  })
  .then(result => dispatch(fetchMyPicturesImageDetailstSuccess(result.data)))
  .catch(error => dispatch(fetchMyPicturesImageDetailstFail(error)));
};

export const fetchImageDetailsAndCounts = params => (dispatch) => {
  dispatch(fetchMissionCount());
  dispatch(fetchMyPicturesCount());
  dispatch(fetchGalleriesCount());// for deeplinking
  dispatch(fetchMyPicturesImageDetails({
    ...params,
  }));
};
