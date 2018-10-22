import axios from 'axios';

export const GET_SHARED_MEMBER_PHOTOS_START = 'GET_SHARED_MEMBER_PHOTOS_START';
export const GET_SHARED_MEMBER_PHOTOS_SUCCESS = 'GET_SHARED_MEMBER_PHOTOS_SUCCESS';
export const GET_SHARED_MEMBER_PHOTOS_FAIL = 'GET_SHARED_MEMBER_PHOTOS_FAIL';
export const STORE_IMAGE_DETAIL_SUCCESS = 'STORE_IMAGE_DETAIL_SUCCESS';
export const STORE_IMAGE_DETAIL_FAIL = 'STORE_IMAGE_DETAIL_FAIL';

const getAndStoreImageDetailsSuccess = payload => ({
  type: STORE_IMAGE_DETAIL_SUCCESS,
  payload,
});

const getAndStoreImageDetailsFail = payload => ({
  type: STORE_IMAGE_DETAIL_FAIL,
  payload,
});

const getAndStoreImageDetails = ({
  shareToken,
  customerImageId,
  useShareToken = 'y',
  callSource,
}) => (dispatch, getState) => {
  const { at, cid, token } = getState().user;
  return axios.post('/api/images/getImageDetails', {
    at,
    cid,
    token,
    shareToken,
    customerImageId,
    useShareToken,
    callSource,
  })
  .then(result => dispatch(getAndStoreImageDetailsSuccess(Object.assign({ customerImageId }, result.data))))
  .catch(error => dispatch(getAndStoreImageDetailsFail(error)));
};
const getSharedMemberPhotosStart = payload => ({
  type: GET_SHARED_MEMBER_PHOTOS_START,
  payload,
});

const getSharedMemberPhotosSuccess = payload => ({
  type: GET_SHARED_MEMBER_PHOTOS_SUCCESS,
  payload,
});

const getSharedMemberPhotosFail = payload => ({
  type: GET_SHARED_MEMBER_PHOTOS_FAIL,
  payload,
});

export const getSharedMemberPhotos = ({
  objectId,
  orderByLikes = false,
  customerId = null,
  makeDetailsCall = false,
}) => (dispatch, getState) => {
  dispatch(getSharedMemberPhotosStart());
  return axios.post('/api/images/getSharedMemberPictures', {
    customerId,
    listOrdering: 'asc',
    objectId,
    orderByLikes,
    pagingMode: 'app',
  })
    .then((result) => {
      if (makeDetailsCall) {
        result.data.imageList.map((image) => {
          dispatch(getAndStoreImageDetails({
            useShareToken: 'n',
            customerImageId: image.customerImageId
          }))
          return image;
        });
      }
      return dispatch(getSharedMemberPhotosSuccess(result.data))
    })
    .catch(error => dispatch(getSharedMemberPhotosFail(error)));
};
