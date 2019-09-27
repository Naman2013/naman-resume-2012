import { API } from 'app/api';

export const getReplies = ({
  at,
  callSource,
  cid,
  count = 10,
  lang,
  page = 1,
  replyTo,
  threadId,
  token,
  topicId,
  ver,
}) => (
  API.post('/api/forum/getReplies', {
    cid,
    callSource,
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
