import axios from 'axios';

export default function fetchCategoryTopicList({
  cid,
  at,
  token,
  status, // optional: published, draft all
  callSource,
}) {
  return axios.post('/api/content/getStoryObjectCategoryTopicList', {
    cid,
    at,
    token,
    status,
    callSource,
  });
}
