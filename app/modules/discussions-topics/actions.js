import axios from 'axios';
import { getTopicList } from '../../services/discussions/get-topic-list';

export const FETCH_TOPIC_LIST_START = 'FETCH_TOPIC_LIST_START';
export const FETCH_TOPIC_LIST_SUCCESS = 'FETCH_TOPIC_LIST_SUCCESS';
export const FETCH_TOPIC_LIST_FAIL = 'FETCH_TOPIC_LIST_FAIL';

const fetchTopicListStart = () => ({
  type: FETCH_TOPIC_LIST_START,
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
  page,
  count,
  sortBy,
  forumId,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  const processedSortBy = sortBy && sortBy.replace('-', '');
  dispatch(fetchTopicListStart());
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
  .then(result => dispatch(fetchTopicListSuccess(result.data)))
  .catch(error => dispatch(fetchTopicListFail(error)));
};
