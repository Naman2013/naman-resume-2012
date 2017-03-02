import axios from 'axios';
import _ from 'lodash';
import { fetchMoreAboutObject } from '../pulse/get-post-action';

export const FETCH_EVENT_INFO_START = 'FETCH_EVENT_INFO_START';
export const FETCH_EVENT_INFO_SUCCESS = 'FETCH_EVENT_INFO_SUCCESS';
export const FETCH_EVENT_INFO_FAIL = 'FETCH_EVENT_INFO_FAIL';
export const LIKE_EVENT_START = 'LIKE_EVENT_START';
export const LIKE_EVENT_SUCCESS = 'LIKE_EVENT_SUCCESS';
export const LIKE_EVENT_FAIL = 'LIKE_EVENT_FAIL';

const fetchEventInfoStart = () => ({
  type: FETCH_EVENT_INFO_START,
});

const fetchEventInfoSuccess = payload => ({
  type: FETCH_EVENT_INFO_SUCCESS,
  payload,
});

const fetchEventInfoFail = payload => ({
  type: FETCH_EVENT_INFO_FAIL,
  payload,
});

export const fetchEventInfo = ({
  lang,
  ver,
  showId,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(fetchEventInfoStart());
  return axios.post('/api/events/getEventInfo', {
    cid,
    at,
    token,
    lang,
    ver,
    showId,
  })
  .then((result) => {
    dispatch(fetchEventInfoSuccess(result.data));
    dispatch(fetchMoreAboutObject({
      slugLookupId: _.get(result, 'data.moreAbout'),
    }));
  })
  .catch(error => dispatch(fetchEventInfoFail(error)));
};

const likeEventStart = () => ({
  type: LIKE_EVENT_START,
});

const likeEventSuccess = payload => ({
  type: LIKE_EVENT_SUCCESS,
  payload,
});

const likeEventFail = payload => ({
  type: LIKE_EVENT_FAIL,
  payload,
});

export const likeEvent = ({
  lang,
  ver,
  likeId,
}) => (dispatch, getState) => {
  const { cid, at, token } = getState().user;
  dispatch(likeEventStart());
  return axios.post('/api/events/like', {
    cid,
    at,
    token,
    lang,
    ver,
    likeId,
  })
  .then(result => dispatch(likeEventSuccess(result.data)))
  .catch((error) => {
    dispatch(likeEventFail(error));
  });
};
