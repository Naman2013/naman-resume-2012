import { API } from 'app/api';

export const prepareThread = ({
  cid,
  at,
  token,
  lang,
  ver,
  status,
}) => (
  API.post('/api/forum/prepareThread', {
    cid,
    at,
    token,
    lang,
    ver,
    status,
  })
);
