import axios from 'axios';

/**
  @param status - (optional) status of Forums and Topics to return (‘published’, ‘draft’, ‘all’) default ‘published’

**/

export const getForumTopicList = ({
  cid,
  at,
  token,
  lang,
  ver,
  status,
}) => (
  axios.post('/api/forum/getForumTopicList', {
    cid,
    at,
    token,
    lang,
    ver,
    status,
  })
);
