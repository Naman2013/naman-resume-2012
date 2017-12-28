import axios from 'axios';

export const SEARCH_FORUMS_START = 'SEARCH_FORUMS_START';
export const SEARCH_FORUMS_SUCCESS = 'SEARCH_FORUMS_SUCCESS';
export const SEARCH_FORUMS_FAIL = 'SEARCH_FORUMS_FAIL';

export const RESET_SEARCH_FORUMS = 'RESET_SEARCH_FORUMS';

const searchForumsStart = payload => ({
  type: SEARCH_FORUMS_START,
  payload,
});

const searchForumsSuccess = payload => ({
  type: SEARCH_FORUMS_SUCCESS,
  payload,
});

const searchForumsFail = payload => ({
  type: SEARCH_FORUMS_FAIL,
  payload,
});

export const searchForums = ({
  lang,
  ver,
  searchterm,
  appendToList = false,
  page = 1,
  count = 10,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(searchForumsStart({ appendToList }));
  return axios.post('/api/forum/searchForum', {
    cid,
    at,
    token,
    lang,
    ver,
    page,
    count,
    searchterm,
  })
  .then(result => dispatch(searchForumsSuccess(Object.assign(
    {
      page,
      appendToList,
    },
    result.data,
  ))))
  .catch(error => dispatch(searchForumsFail(error)));
};

export const resetDiscussionsSearch = () => ({
  type: RESET_SEARCH_FORUMS,
});
