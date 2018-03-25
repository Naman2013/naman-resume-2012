import axios from 'axios';

export const submitReply = ({
  at,
  callSource,
  cid,
  content,
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
  return axios.post('/api/forum/submitReply', {
    at,
    callSource,
    cid,
    content,
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
