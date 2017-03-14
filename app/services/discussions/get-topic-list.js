import axios from 'axios';

/**
  @param sortBy    (optional)   mostrecent (default), mostactive, alphabetic

  @param count   (optional) Number of forums to return at a time (per page) default is -1: “all forums”.

  @param page  (optional) Which page of posts to return.  Default is 1 (first page)

  @param forumId  (required) Forum for which to retrieve the list of topics.

  */

export const getTopicList = ({
  cid,
  at,
  token,
  lang,
  ver,
  page,
  count,
  sortBy,
  forumId,
}) => (
  axios.post('/api/forum/getTopicList', {
    cid,
    at,
    token,
    lang,
    ver,
    page,
    count,
    sortBy,
    forumId,
  })
);

export const SORT_ALPHABETIC = 'alphabetic';
export const SORT_MOST_ACTIVE = 'mostactive';
export const SORT_MOST_RECENT = 'mostrecent';
