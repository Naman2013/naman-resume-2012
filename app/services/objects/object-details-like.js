import { API } from 'app/api';

export default function fetchLikeService({ token, at, cid, likeId }) {
  return API.post('/api/images/like', {
    token,
    at,
    cid,
    likeId,
  });
}
