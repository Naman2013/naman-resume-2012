import axios from 'axios';
import createReducer from './utils/createReducer';

const FETCH_DATE_RANGE_START = 'FETCH_DATE_RANGE_START';
const FETCH_DATE_RANGE_SUCCESS = 'FETCH_DATE_RANGE_SUCCESS';
const FETCH_DATE_RANGE_FAIL = 'FETCH_DATE_RANGE_FAIL';

export const fetchDateRanges = () => () => {

};

const initialState = {
  dateRangeResponse: {},
  dateRangeFetchError: {},
  dateRangeIsError: false,
  dateRangeIsFetching: false,

  
};

export default createReducer(initialState, {

});
