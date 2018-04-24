import axios from 'axios';

/** V4 request group

  @param cid (int) (required) Customer ID
  @param at (int) (required) Account type
  @param token (string) (required) 	Authentication token

  @param definition (string) (required) User’s description of the group’s purpose
  @param Access (string) (required) ‘public’ or ‘private’: user’s suggestion
  for the new group’s access.

  Standard optional request data such as:

  @param ver
  @param lang


*/

export const requestGroup = ({
  cid,
  at,
  token,
  access,
  definition,
  ver,
  lang,
}) => (
  axios.post('/api/discussiongroups/requestGroup', {
    cid,
    at,
    token,
    access,
    definition,
    ver,
    lang,
  })
);
