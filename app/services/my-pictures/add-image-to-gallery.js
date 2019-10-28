import { API } from 'app/api';

export const addImageToGallery = ({
  at,
  cid,
  token,
  galleryId,
  customerImageId,
}) => (
  API.post('/api/images/addImageToGallery', {
    at,
    cid,
    token,
    galleryId,
    customerImageId,
  })
);
