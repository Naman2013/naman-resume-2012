import axios from 'axios';

export default function fetchLikeService({ token, at, cid, likeId }) {
  return axios.post('/api/images/like', {
    token,
    at,
    cid,
    likeId,
  });
}
