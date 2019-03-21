import axios from 'axios';

export const DOWNLOAD_IMAGE_REQUEST = 'DOWNLOAD_IMAGE_REQUEST';
export const DOWNLOAD_IMAGE_SUCCESS = 'DOWNLOAD_IMAGE_SUCCESS';
export const DOWNLOAD_IMAGE_ERROR = 'DOWNLOAD_IMAGE_ERROR';

const downloadImageRequest = () => ({
  type: DOWNLOAD_IMAGE_REQUEST,
});

const downloadImageSuccess = () => ({
  type: DOWNLOAD_IMAGE_SUCCESS,
});

const downloadImageError = error => ({
  type: DOWNLOAD_IMAGE_ERROR,
  error,
});

export const downloadImage = url => dispatch => {
  dispatch(downloadImageRequest);

  // TODO: fix cors
  return axios(url, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
  })
    .then(response => {
      dispatch(downloadImageSuccess());
    })
    .catch(err => {
      dispatch(downloadImageError(err));
    });
};
