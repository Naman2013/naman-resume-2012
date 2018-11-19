import axios from 'axios';

/**
  formData: {
    cid,
    token,
    at,
    uniqueId,
    imageClass,
    attachment,
  }
*/

export default function setPostImages(data) {
  return axios({
    method: 'post',
    url: '/api/content/setPostImage',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
}
