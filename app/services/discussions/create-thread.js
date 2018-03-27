import axios from 'axios';

/**
  @param cid (required) Customer ID
  @param at (required)  Account type
  @param token (required)  Authentication token
  @param status (optional)  ‘draft’ or ‘publish’.  Default is ‘publish’ Note that this differs from submitObjectContent.
  @param forumId (required) The current forum’s ID
  @param topicId (required) The current topic ID
  @param title (required) Title for post
  @param content (required) Body of post
  @param S3URLs (optional)  List (array) of URLs for files uploaded to S3


**/

export const createThread = ({
  cid,
  at,
  token,
  lang,
  ver,
  status,
  forumId,
  title,
  content,
  S3URLs,
  topicId,
  callSource,
  objectId,
}) => (
  axios.post('/api/forum/createThread', {
    cid,
    at,
    token,
    lang,
    ver,
    status,
    forumId,
    title,
    content,
    S3URLs,
    topicId,
    callSource,
    objectId,
  })
);
