import moment from 'moment';
import {fetchObservatoryList} from '../../services/events/fetch-upcoming-events';

export const FETCH_LIST_START = 'FETCH_LIST_START';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAIL = 'FETCH_LIST_FAIL';

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

export const fetchList = () => (dispatch) => {
  dispatch(fetchListStart()); 
  return fetchObservatoryList()
    .then((result) => {
      if (!result.data.apiError) {  
        const duration=(result.data.expires-result.data.timestamp) * 1000;     
        setTimeout(()=>dispatch(fetchList()),duration);
        dispatch(fetchListSuccess(result.data));
      }
    })
    .catch(error => dispatch(fetchListFail(error)));
};

