import axios from 'axios';

export const deleteGallery = ({
  at,
  cid,
  token,
  galleryId,
}) => (
  axios.post('/api/images/deleteGallery', {
    at,
    cid,
    token,
    galleryId,
  })
);
