import { API } from 'app/api';

export const prepareReply = ({
  cid,
  at,
  token,
  lang,
  ver,
  status,
}) => (
  API.post('/api/forum/prepareReply', {
    cid,
    at,
    token,
    lang,
    ver,
    status,
  })
);
