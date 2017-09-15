import axios from 'axios';

export const likeImage = ({
  at,
  cid,
  token,
  likeId,
}) => (
  axios.post('/api/images/like', {
    at,
    cid,
    token,
    likeId,
  })
);
