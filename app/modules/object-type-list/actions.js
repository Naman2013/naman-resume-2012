import axios from 'axios';

export const FETCH_OBJECT_TYPE_LIST_START = 'FETCH_OBJECT_TYPE_LIST_START';
export const FETCH_OBJECT_TYPE_LIST_SUCCESS = 'FETCH_OBJECT_TYPE_LIST_SUCCESS';
export const FETCH_OBJECT_TYPE_LIST_FAIL = 'FETCH_OBJECT_TYPE_LIST_FAIL';

const fetchObjectTypeListStart = () => ({
  type: FETCH_OBJECT_TYPE_LIST_START,
});

const fetchObjectTypeListSuccess = payload => ({
  type: FETCH_OBJECT_TYPE_LIST_SUCCESS,
  payload,
});

const fetchObjectTypeListFail = payload => ({
  type: FETCH_OBJECT_TYPE_LIST_FAIL,
  payload,
});

export const fetchObjectTypeList = () => (dispatch, getState) => {
  const { at, token, cid } = getState().user;
  dispatch(fetchObjectTypeListStart());

  return axios.post('/api/images/getObjectTypeList', {
    at,
    token,
    cid,
  })
  .then(result => dispatch(fetchObjectTypeListSuccess(result.data)))
  .catch(error => dispatch(fetchObjectTypeListFail(error)));
};
