import moment from 'moment';
import {fetchObservatoryList, fetchMissionQuotaData} from '../../services/events/fetch-upcoming-events';
import { getUserInfo } from '../User';

export const FETCH_LIST_START = 'FETCH_LIST_START';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAIL = 'FETCH_LIST_FAIL';
export const FETCH_QUOTA_START = 'FETCH_QUOTA_START';
export const FETCH_QUOTA_SUCCESS = 'FETCH_QUOTA_SUCCESS';
export const FETCH_QUOTA_FAIL = 'FETCH_QUOTA_FAIL';

let observatoryTimerId=null;
let missionQuotaTimerId=null;

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
        if(observatoryTimerId !== null)
          clearTimeout(observatoryTimerId);
        const duration=(result.data.expires-result.data.timestamp) * 1000;
        if(duration > 1000)
          observatoryTimerId=setTimeout(()=>dispatch(fetchList()), duration );          
        dispatch(fetchListSuccess(result.data));
      }
    })
    .catch(error => dispatch(fetchListFail(error)));
};

export const fetchMissionQuota = (data) => (dispatch) => {  
  dispatch(fetchQuotaStart()); 
  const {at, cid, token}=getUserInfo();
  return fetchMissionQuotaData({at, cid, token, ...data})
    .then((result) => {
      if (!result.data.apiError) {  
        if(missionQuotaTimerId !== null)
          clearTimeout(missionQuotaTimerId);
        const duration=(result.data.expires-result.data.timestamp) * 1000;
        if(duration > 1000)
          missionQuotaTimerId=setTimeout(()=>dispatch(fetchMissionQuota(data)), duration );        
        dispatch(fetchQuotaSuccess(result.data));
      }
    })
    .catch(error => dispatch(fetchQuotaFail(error)));
};

export const stopMissionQuotaTimer = () => (dispatch) => {
  if(missionQuotaTimerId !== null)
    clearTimeout(missionQuotaTimerId);
}

