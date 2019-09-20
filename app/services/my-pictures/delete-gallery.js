import { API } from 'app/api';

export const deleteGallery = ({
  at,
  cid,
  token,
  galleryId,
}) => (
  API.post('/api/images/deleteGallery', {
    at,
    cid,
    token,
    galleryId,
  })
);
