import { API } from 'app/api';

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
  return API.post('/api/discussion/flagItem', {
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
