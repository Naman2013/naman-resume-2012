import axios from 'axios';

export const prepareThread = ({
  cid,
  at,
  token,
  lang,
  ver,
  status,
}) => (
  axios.post('/api/forum/prepareThread', {
    cid,
    at,
    token,
    lang,
    ver,
    status,
  })
);
