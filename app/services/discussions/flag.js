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
}) {
  return axios.post('/api/discussion/flagItem', {
    at,
    token,
    cid,
    type,
    itemType: 'thread',
    itemId,
    forumId,
    topicId,
    discussionGroupId,
  });
}
