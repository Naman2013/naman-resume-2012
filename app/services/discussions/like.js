/**
  Allow a logged-in user to ‘like’ something (initially just a specific post).
  Note that this API will not allow a user to ‘like’ something (a post) that
  they have already liked; an error will be returned in that event.

  Request data for /api/forum/likeReply

  cid (required) Slooh CustomerId of the user liking the reply
  at (required)  Slooh account type
  token (required) Slooh auth token
  replyId (required) ID of the reply being liked
  authorId (required) The CustomerId of the author of the reply.
  forumId (required) The ID of the Forum for the reply
  topicId (required) The ID of the Topic for the reply.

  Request data for /api/forum/likeThread

  cid (required) Slooh CustomerId of the user liking the thread
  at (required)  Slooh account type
  token (required) Slooh auth token
  threadId (required) ID of the Thread being liked
  authorId (required) The CustomerId of the author of the thread.
  forumId (required) The ID of the Forum for the thread
  topicId (required) The ID of the Topic for the thread.
  */

import axios from 'axios';

export function likeReply({
  at,
  token,
  cid,
  replyId,
  authorId,
  forumId,
  topicId,
  membershipType,
  objectId,
  replyType,
  callSource,
}) {
  return axios.post('/api/forum/likeReply', {
    at,
    token,
    cid,
    replyId,
    authorId,
    forumId,
    topicId,
    membershipType,
    objectId,
    replyType,
    callSource,
  });
}

export function likeThread({
  at,
  token,
  cid,
  threadId,
  authorId,
  forumId,
  topicId,
  membershipType,
}) {
  return axios.post('/api/forum/likeThread', {
    at,
    token,
    cid,
    threadId,
    authorId,
    forumId,
    topicId,
    membershipType,
  });
}
