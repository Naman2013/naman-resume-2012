import axios from 'axios';

export const FETCH_PICTURES_START = 'FETCH_PICTURES_START';
export const FETCH_PICTURES_SUCCESS = 'FETCH_PICTURES_SUCCESS';
export const FETCH_PICTURES_FAIL = 'FETCH_PICTURES_FAIL';

export const fetchPictures = (id) => (dispatch, getState) => {
  const { cid } = getState().user;
    
  dispatch(fetchPicturesStart());
  
  return axios.post('/api/content/getPost', {
    cid,
    postId: id
  })
    .then(result => dispatch(fetchPicturesSuccess(result.data)))
    .catch(error => dispatch(fetchPicturesFail(error)));
};

const fetchPicturesStart = () => ({
  type: FETCH_PICTURES_START,
});

const fetchPicturesSuccess = (payload) => ({
  type: FETCH_PICTURES_SUCCESS,
  payload,
});

const fetchPicturesFail = (payload) => ({
  type: FETCH_PICTURES_FAIL,
  payload,
});
