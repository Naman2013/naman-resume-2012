import axios from 'axios';

export function flagItem({
  at,
  token,
  cid,
  type,
  itemId,
  forumId,
  topicId,
  discussionGroupId,
  itemType,
}) {
  return axios.post('/api/discussion/flagItem', {
    at,
    token,
    cid,
    type,
    itemType,
    itemId,
    forumId,
    topicId,
    discussionGroupId,
  });
}
