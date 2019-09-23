import { API } from 'app/api';

export const deleteImage = ({
  at,
  cid,
  token,
  customerImageId,
}) => (
  API.post('/api/images/deleteImage', {
    at,
    cid,
    token,
    customerImageId,
  })
);
