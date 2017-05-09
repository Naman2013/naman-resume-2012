/**
  Allow a logged-in user to ‘like’ something (initially just a specific post).
  Note that this API will not allow a user to ‘like’ something (a post) that
  they have already liked; an error will be returned in that event.

  Request data for /api/content/like

  cid (required) Slooh Customer ID
  at (required) Slooh account type
  token (required) Slooh auth token
  likeType (optional) What is being liked.  Default is ‘post’
  likeId (required) Identifier for what is being liked.  For a post, the post ID.
  */

import axios from 'axios';

export default function like({
  at,
  token,
  cid,
  likeType,
  likeId,
  membershipType,
}) {
  return axios.post('/api/content/like', {
    at,
    token,
    cid,
    likeType,
    likeId,
    membershipType,
  });
}
