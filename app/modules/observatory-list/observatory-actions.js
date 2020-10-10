import moment from 'moment';
import {fetchObservatoryList, fetchMissionQuotaData} from '../../services/events/fetch-upcoming-events';
import { getUserInfo } from '../User';

export const FETCH_LIST_START = 'FETCH_LIST_START';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAIL = 'FETCH_LIST_FAIL';
export const FETCH_QUOTA_START = 'FETCH_QUOTA_START';
export const FETCH_QUOTA_SUCCESS = 'FETCH_QUOTA_SUCCESS';
export const FETCH_QUOTA_FAIL = 'FETCH_QUOTA_FAIL';

const observatoryTimerId=null;
const missionQuotaTimerId=null;

export const fetchListStart = () => ({
  type: FETCH_LIST_START,
});

export const fetchListSuccess = payload => ({
  type: FETCH_LIST_SUCCESS,
  payload,
});

export const fetchListFail = payload => ({
  type: FETCH_LIST_FAIL,
  payload,
});

export const fetchQuotaFail = payload => ({
  type: FETCH_QUOTA_FAIL,
  payload,
});

export const fetchQuotaStart = () => ({
  type: FETCH_QUOTA_START,
});

export const fetchQuotaSuccess = payload => ({
  type: FETCH_QUOTA_SUCCESS,
  payload,
});

export const fetchList = () => (dispatch) => {
  dispatch(fetchListStart()); 
  const {at, cid, token}=getUserInfo();
  return fetchObservatoryList({at, cid, token})
    .then((result) => {
      if (!result.data.apiError) {  
        setTimer(observatoryTimerId, result.data.expires, result.data.timestamp, fetchList, dispatch);
        dispatch(fetchListSuccess(result.data));
      }
    })
    .catch(error => dispatch(fetchListFail(error)));
};

export const fetchMissionQuota = () => (dispatch) => {
  dispatch(fetchQuotaStart()); 
  const {at, cid, token}=getUserInfo();
  return fetchMissionQuotaData({at, cid, token})
    .then((result) => {
      if (!result.data.apiError) {  
        setTimer( observatoryTimerId, result.data.expires, result.data.timestamp, fetchMissionQuota, dispatch);
        dispatch(fetchQuotaSuccess(result.data));
      }
    })
    .catch(error => dispatch(fetchQuotaFail(error)));
};

const setTimer = (timerId, expires, timestamp, callback, dispatch) =>{
  if(timerId !== null)
    clearTimeout(timerId);
  const duration=(expires-timestamp) * 1000;
  if(duration > 1000)
    timerId=setTimeout(()=>dispatch(callback()),duration);
}
