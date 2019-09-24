import { API } from 'app/api';

export const getThreadList = ({
  callSource,
  cid,
  at,
  token,
  lang,
  ver,
  topicId,
  page = 1,
  count = 10,
  sortBy,
}) => (
  API.post('/api/forum/getThreadList', {
    callSource,
    cid,
    at,
    token,
    lang,
    ver,
    topicId,
    page,
    count,
    sortBy,
  })
);
