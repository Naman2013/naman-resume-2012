import { API } from 'app/api';

export const removeImageFromGallery = ({
  at,
  cid,
  token,
  galleryId,
  customerImageId,
}) => (
  API.post('/api/images/removeImageFromGallery', {
    at,
    cid,
    token,
    galleryId,
    customerImageId,
  })
);
