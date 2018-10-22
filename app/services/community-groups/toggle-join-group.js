import axios from 'axios';

/** V4 toggle join group

  @param cid (int) (required) Customer ID
  @param at (int) (required)  Account type
  @param token (string) (required)  Authentication token

  @param discussionGroupId (int) (required) The ID of the group being joined of un-joined

  Standard optional request data such as:

  @param ver
  @param lang

*/

export const toggleJoinGroup = ({
  cid,
  at,
  token,
  discussionGroupId,
  ver,
  lang,
}) => (
  axios.post('/api/discussiongroups/toggleJoinGroup', {
    cid,
    at,
    token,
    discussionGroupId,
    ver,
    lang,
  })
);
