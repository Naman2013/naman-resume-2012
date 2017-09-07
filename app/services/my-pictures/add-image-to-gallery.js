import axios from 'axios';

export const addImageToGallery = ({
  at,
  cid,
  token,
  galleryId,
  customerImageId,
}) => (
  axios.post('/api/images/addImageToGallery', {
    at,
    cid,
    token,
    galleryId,
    customerImageId,
  })
);
