import { API } from 'app/api';

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
  return API({
    method: 'post',
    url: '/api/content/setPostImage',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
}
