import axios from 'axios';

export const deleteImage = ({
  at,
  cid,
  token,
  customerImageId,
}) => (
  axios.post('/api/images/deleteImage', {
    at,
    cid,
    token,
    customerImageId,
  })
);
