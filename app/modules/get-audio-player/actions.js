import getAudioPlayer from '../../services/shows/get-audio-player';

export const START_FETCH_PLAYER = 'START_FETCH_PLAYER';
export const SUCCESS_FETCH_PLAYER = 'SUCCESS_FETCH_PLAYER';
export const FAIL_FETCH_PLAYER = 'FAIL_FETCH_PLAYER';

const globalFetchTimer = null;

function setExpiresTimer() {}

const startFetchPlayer = () => ({
  type: START_FETCH_PLAYER,
});

const successFetchPlayer = payload => ({
  type: SUCCESS_FETCH_PLAYER,
  payload,
});

export const fetchPlayer = ({ pageURL }) => (dispatch, getState) => {
  const { at, cid, token } = getState().user;
  dispatch(startFetchPlayer());
  console.log(pageURL);
  console.log(at, cid, token);
};
