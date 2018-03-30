import axios from 'axios';

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
  axios.post('/api/forum/getThreadList', {
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
