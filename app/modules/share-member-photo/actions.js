import { API } from 'app/api';

export const SHARE_MEMBER_PHOTO_START = 'SHARE_MEMBER_PHOTO_START';
export const SHARE_MEMBER_PHOTO_SUCCESS = 'SHARE_MEMBER_PHOTO_SUCCESS';
export const SHARE_MEMBER_PHOTO_FAIL = 'SHARE_MEMBER_PHOTO_FAIL';
export const SHARE_MEMBER_PHOTO_RESET = 'SHARE_MEMBER_PHOTO_RESET';
const shareMemberPictureStart = payload => ({
  type: SHARE_MEMBER_PHOTO_START,
  payload,
});

const shareMemberPictureSuccess = payload => ({
  type: SHARE_MEMBER_PHOTO_SUCCESS,
  payload,
});

const shareMemberPictureFail = payload => ({
  type: SHARE_MEMBER_PHOTO_FAIL,
  payload,
});

export const resetShareMemberPhoto = () => ({
  type: SHARE_MEMBER_PHOTO_RESET,
});


export const shareMemberPicture = ({
  customerImageId,
}) => (dispatch, getState) => {
  const { token, cid, at } = getState().user;
  dispatch(shareMemberPictureStart());
  return API.post('/api/images/shareMemberPicture', {
    at,
    cid,
    token,
    customerImageId,
  })
    .then(result => dispatch(shareMemberPictureSuccess(Object.assign({ customerImageId }, result.data))))
    .catch(error => dispatch(shareMemberPictureFail(error)));
};
