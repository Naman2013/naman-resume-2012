import axios from 'axios';

export const FETCH_AUTHOR_CONTENT_START = 'FETCH_AUTHOR_CONTENT_START';
export const FETCH_AUTHOR_CONTENT_SUCCESS = 'FETCH_AUTHOR_CONTENT_SUCCESS';
export const FETCH_AUTHOR_CONTENT_FAIL = 'FETCH_AUTHOR_CONTENT_FAIL';

const fetchAuthorContentStart = () => ({
  type: FETCH_AUTHOR_CONTENT_START,
});

const fetchAuthorContentSuccess = payload => ({
  type: FETCH_AUTHOR_CONTENT_SUCCESS,
  payload,
});

const fetchAuthorContentFail = payload => ({
  type: FETCH_AUTHOR_CONTENT_SUCCESS,
  payload,
});

export const fetchAuthorContent = ({
  page = 1,
  ignorePostId,
  authorId,
  slug,
  slugLookupId,
  type,
  callSource = 'community',
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const { count } = getState().authorContent;
  dispatch(fetchAuthorContentStart());
  return axios.post(' /api/content/getContent', {
    cid,
    at,
    token,
    callSource,
    excludePosts: ignorePostId ? [ignorePostId] : null,
    authorId,
    page,
    slug,
    slugLookupId,
    count,
    type: [type],
  })
  .then(result => dispatch(fetchAuthorContentSuccess(Object.assign({ page }, result.data))))
  .catch(error => dispatch(fetchAuthorContentFail(error)));
};
