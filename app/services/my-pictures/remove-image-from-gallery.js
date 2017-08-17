import axios from 'axios';

export const removeImageFromGallery = ({
  at,
  cid,
  token,
  galleryId,
  customerImageId,
}) => (
  axios.post('/api/images/removeImageFromGallery', {
    at,
    cid,
    token,
    galleryId,
    customerImageId,
  })
);
