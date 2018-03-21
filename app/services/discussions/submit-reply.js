import axios from 'axios';

export const submitReply = ({
  lang,
  ver,
  status,
  topicId,
  threadId,
  replyTo,
  title,
  content,
  S3URLs,
  cid,
  at,
  token,
}) => {
  return axios.post('/api/forum/submitReply', {
    cid,
    at,
    token,
    lang,
    ver,
    status,
    topicId,
    threadId,
    replyTo,
    title,
    content,
    S3URLs,
  });
});
