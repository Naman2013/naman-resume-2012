import axios from 'axios';
import get from 'lodash/get';
import { fetchMoreAboutObject } from '../pulse/get-post-action';

export const FETCH_EVENT_INFO_START = 'FETCH_EVENT_INFO_START';
export const FETCH_EVENT_INFO_SUCCESS = 'FETCH_EVENT_INFO_SUCCESS';
export const FETCH_EVENT_INFO_FAIL = 'FETCH_EVENT_INFO_FAIL';

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
      slugLookupId: get(result, 'data.moreAbout'),
    }));
  })
  .catch(error => dispatch(fetchEventInfoFail(error)));
};
