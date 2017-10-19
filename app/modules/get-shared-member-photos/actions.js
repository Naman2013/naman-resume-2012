import axios from 'axios';

export const GET_SHARED_MEMBER_PHOTOS_START = 'GET_SHARED_MEMBER_PHOTOS_START';
export const GET_SHARED_MEMBER_PHOTOS_SUCCESS = 'GET_SHARED_MEMBER_PHOTOS_SUCCESS';
export const GET_SHARED_MEMBER_PHOTOS_FAIL = 'GET_SHARED_MEMBER_PHOTOS_FAIL';

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

export const getSharedMemberPhotos = () => (dispatch, getState) => {
  dispatch(getSharedMemberPhotosStart());
  return axios.post('/api/images/getSharedMemberPictures', {
    pagingMode: 'app',
    listOrdering: 'asc',
  })
    .then(result => dispatch(getSharedMemberPhotosSuccess(result.data)))
    .catch(error => dispatch(getSharedMemberPhotosFail(error)));
};
