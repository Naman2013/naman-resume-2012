import axios from 'axios';
import { downloadFile } from 'app/utils/downloadFile';

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

export const downloadImage = (url, fileName) => dispatch => {
  dispatch(downloadImageRequest);

  // TODO: CORS on server
  return axios(url, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    responseType: 'blob',
    credentials: 'same-origin',
  })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      const name = `${fileName}.png`;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      link.remove();

      downloadFile(response.data, fileName);
      dispatch(downloadImageSuccess());
    })
    .catch(err => {
      dispatch(downloadImageError(err));
    });
};
