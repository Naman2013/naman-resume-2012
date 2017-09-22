import axios from 'axios';

export const MY_PICS_VERIFY_OWNER_START = 'MY_PICS_VERIFY_OWNER_START';
export const MY_PICS_VERIFY_OWNER_SUCCESS = 'MY_PICS_VERIFY_OWNER_SUCCESS';
export const MY_PICS_VERIFY_OWNER_FAIL = 'MY_PICS_VERIFY_OWNER_FAIL';

const verifyMyPicsOwnerStart = payload => ({
  type: MY_PICS_VERIFY_OWNER_START,
  payload,
});

const verifyMyPicsOwnerSuccess = payload => ({
  type: MY_PICS_VERIFY_OWNER_SUCCESS,
  payload,
});

const verifyMyPicsOwnerFail = payload => ({
  type: MY_PICS_VERIFY_OWNER_FAIL,
  payload,
});

export const verifyMyPicsOwner = ({
  itemType,
  itemId,
}) => (dispatch, getState) => {
  const { cid } = getState().user;
  dispatch(verifyMyPicsOwnerStart());
  return axios.post('/api/images/verifyOwner', {
    cid,
    itemType,
    itemId,
  })
    .then(result => dispatch(verifyMyPicsOwnerSuccess(result.data)))
    .catch(error => dispatch(verifyMyPicsOwnerFail(error)));
};
