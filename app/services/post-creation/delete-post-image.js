/**
  /api/content/deletePostImage Request parameters:

  cid (required)
  at (required)
  token (required) (user must be logged in with an active account capable of posting
  community content - if not, the statusCode will have a 401 error)

  uniqueId (required)  postUUID from /api/content/getObjectCategoryTopicList API response (or
  similar API) to identify the draft community post, discussion board post, or gallery
  to which the deleted image belonged

  imageClass (required) 'community', 'discussion', 'mypictures'

  imageURL (required)  the URL of the image to be deleted

  ver  (optional)  API version - currently only v1 (and defaults to v1)

  lang  (optional) API response language - currently only en (English) - defaults to en
  */

import axios from 'axios';

export default function deletePostImage({
  cid,
  at,
  token,
  uniqueId,
  imageClass,
  imageURL }) {
  return axios.post('/api/content/deletePostImage', {
    cid,
    at,
    token,
    uniqueId,
    imageClass,
    imageURL,
  });
}
