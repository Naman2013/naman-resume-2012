import { API } from 'app/api';

export default function fetchCategoryTopicList({
  cid,
  at,
  token,
  status, // optional: published, draft all
  callSource,
}) {
  return API.post('/api/content/getStoryObjectCategoryTopicList', {
    cid,
    at,
    token,
    status,
    callSource,
  });
}
