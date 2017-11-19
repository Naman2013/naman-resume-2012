import axios from 'axios';
import { getTopicList, SORT_MENU_ORDER } from '../../services/discussions/get-topic-list';

export const FETCH_TOPIC_LIST_START = 'FETCH_TOPIC_LIST_START';
export const FETCH_TOPIC_LIST_SUCCESS = 'FETCH_TOPIC_LIST_SUCCESS';
export const FETCH_TOPIC_LIST_FAIL = 'FETCH_TOPIC_LIST_FAIL';

const fetchTopicListStart = payload => ({
  type: FETCH_TOPIC_LIST_START,
  payload,
});

const fetchTopicListSuccess = payload => ({
  type: FETCH_TOPIC_LIST_SUCCESS,
  payload,
});

const fetchTopicListFail = payload => ({
  type: FETCH_TOPIC_LIST_FAIL,
  payload,
});

export const fetchTopicList = ({
  lang,
  ver,
  page = 1,
  count = 10,
  sortBy,
  forumId,
  appendToList = false,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const processedSortBy = sortBy && sortBy.replace('-', '');
  dispatch(fetchTopicListStart({ appendToList }));
  return getTopicList({
    cid,
    at,
    token,
    lang,
    ver,
    page,
    count,
    sortBy: processedSortBy,
    forumId,
  })
  .then(result => dispatch(fetchTopicListSuccess(Object.assign(
    { appendToList, page },
    result.data,
  ))))
  .catch(error => dispatch(fetchTopicListFail(error)));
};
