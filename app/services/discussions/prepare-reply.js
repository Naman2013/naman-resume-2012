import axios from 'axios';

export const prepareReply = ({
  cid,
  at,
  token,
  lang,
  ver,
  status,
}) => (
  axios.post('/api/forum/prepareReply', {
    cid,
    at,
    token,
    lang,
    ver,
    status,
  })
);
