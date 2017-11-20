import axios from 'axios';

/**
  @param sortBy    (optional)   mostrecent (default), mostactive, alphabetic

  @param count   (optional) Number of forums to return at a time (per page) default is -1: “all forums”.

  @param page  (optional) Which page of posts to return.  Default is 1 (first page)

  */

export const getForumList = ({
  cid,
  at,
  token,
  lang,
  ver,
  page,
  count,
  sortBy,
}) => (
  axios.post('/api/forum/getForumList', {
    cid,
    at,
    token,
    lang,
    ver,
    page,
    count,
    sortBy,
  })
);

export const SORT_MENU_ORDER = 'menuorder';
export const SORT_ALPHABETIC = 'alphabetic';
export const SORT_MOST_ACTIVE = 'mostactive';
export const SORT_MOST_RECENT = 'mostrecent';
