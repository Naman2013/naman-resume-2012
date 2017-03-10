import axios from 'axios';
import { getForumList } from '../../services/discussions/get-forum-list';

export const FETCH_FORUM_LIST_START = 'FETCH_FORUM_LIST_START';
export const FETCH_FORUM_LIST_SUCCESS = 'FETCH_FORUM_LIST_SUCCESS';
export const FETCH_FORUM_LIST_FAIL = 'FETCH_FORUM_LIST_FAIL';

const fetchForumListStart = () => ({
  type: FETCH_FORUM_LIST_START,
});

const fetchForumListSuccess = payload => ({
  type: FETCH_FORUM_LIST_SUCCESS,
  payload,
});

const fetchForumListFail = payload => ({
  type: FETCH_FORUM_LIST_FAIL,
  payload,
});

export const fetchForumList = ({
  lang,
  ver,
  page,
  count,
  sortBy,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchForumListStart());
  return getForumList({
    cid,
    at,
    token,
    lang,
    ver,
    page,
    count,
    sortBy,
  })
  .then(result => dispatch(fetchForumListSuccess(result.data)))
  .catch(error => dispatch(fetchForumListFail(error)));
};
