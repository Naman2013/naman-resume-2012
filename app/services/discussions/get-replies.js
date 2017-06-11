import axios from 'axios';

export const getReplies = ({
  cid,
  at,
  token,
  lang,
  ver,
  topicId,
  threadId,
  page = 1,
  count = 10,
  replyTo,
}) => (
  axios.post('/api/forum/getReplies', {
    cid,
    at,
    token,
    lang,
    ver,
    threadId,
    topicId,
    page,
    count,
    replyTo,
  })
);
