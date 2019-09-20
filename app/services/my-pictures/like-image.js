import { API } from 'app/api';

export const likeImage = ({
  at,
  cid,
  token,
  likeId,
}) => (
  API.post('/api/images/like', {
    at,
    cid,
    token,
    likeId,
  })
);
