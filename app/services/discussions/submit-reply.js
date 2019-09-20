import { API } from 'app/api';

export const submitReply = ({
  at,
  callSource,
  cid,
  content,
  forumId,
  lang,
  objectId,
  replyTo,
  S3URLs,
  status,
  threadId,
  title,
  token,
  topicId,
  ver,
}) => {
  return API.post('/api/forum/submitReply', {
    at,
    callSource,
    cid,
    content,
    forumId,
    lang,
    objectId,
    replyTo,
    S3URLs,
    status,
    threadId,
    title,
    token,
    topicId,
    ver,
  });
}
