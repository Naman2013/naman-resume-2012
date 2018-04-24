import axios from 'axios';

/** V4 ask to join a group

  @param cid (int) (required) Customer ID
  @param at (int) (required)  Account type
  @param token (string) (required)  Authentication token

  @param discussionGroupId (int) (required) The ID of the group being joined of un-joined

  Standard optional request data such as:

  @param ver
  @param lang

*/

export const askToJoin = ({
  cid,
  at,
  token,
  discussionGroupId,
  ver,
  lang,
}) => (
  axios.post('/api/discussiongroups/askToJoin', {
    cid,
    at,
    token,
    discussionGroupId,
    ver,
    lang,
  })
);
