import axios from 'axios';

export const FETCH_POST_START = 'FETCH_POST_START';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAIL = 'FETCH_POST_FAIL';

export const fetchPost = (id) => (dispatch, getState) => {
  const { cid } = getState().user;
    
  dispatch(fetchPostStart());
  
  return axios.post('/api/content/getPost', {
    cid,
    postId: id
  })
    .then(result => dispatch(fetchPostSuccess(result.data)))
    .catch(error => dispatch(fetchPostFail(error)));
};

const fetchPostStart = () => ({
  type: FETCH_POST_START,
});

const fetchPostSuccess = (payload) => ({
  type: FETCH_POST_SUCCESS,
  payload,
});

const fetchPostFail = (payload) => ({
  type: FETCH_POST_FAIL,
  payload,
});
