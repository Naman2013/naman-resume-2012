export const START_FETCH_PLAYER = 'START_FETCH_PLAYER';
export const SUCCESS_FETCH_PLAYER = 'SUCCESS_FETCH_PLAYER';
export const FAIL_FETCH_PLAYER = 'FAIL_FETCH_PLAYER';

const successFetchPlayer = payload => ({
  type: SUCCESS_FETCH_PLAYER,
  payload,
});

const fetchPlayer = dispatch => ({ pageURL }) => {};
