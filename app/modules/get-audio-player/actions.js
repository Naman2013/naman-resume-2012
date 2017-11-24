import moment from 'moment';
import getAudioPlayer from '../../services/shows/get-audio-player';
import store from '../../store';

export const START_FETCH_PLAYER = 'START_FETCH_PLAYER';
export const SUCCESS_FETCH_PLAYER = 'SUCCESS_FETCH_PLAYER';
export const FAIL_FETCH_PLAYER = 'FAIL_FETCH_PLAYER';

let expiresTimer = null;

function refreshTimer(pageURL, expires = 0) {
  clearTimeout(expiresTimer);
  const convertedExpiresToMilli = expires * 1000;
  const now = moment.utc().valueOf();
  const time = convertedExpiresToMilli - now;

  if (time > 100) {
    expiresTimer = window.setTimeout(() => {
      store.dispatch(fetchPlayer({ pageURL }));
    }, time);
  }
}

function setExpiresTimer(pageURL, { expires }) {
  refreshTimer(pageURL, expires);
}

const startFetchPlayer = () => ({
  type: START_FETCH_PLAYER,
});

const successFetchPlayer = payload => ({
  type: SUCCESS_FETCH_PLAYER,
  payload,
});

const failFetchPlayer = payload => ({
  type: FAIL_FETCH_PLAYER,
  payload,
});

export const fetchPlayer = ({ pageURL }) => (dispatch, getState) => {
  const { at, cid, token } = getState().user;
  dispatch(startFetchPlayer());

  getAudioPlayer({ at, cid, token, pageSource: pageURL })
    .then((result) => {
      setExpiresTimer(pageURL, result.data);
      dispatch(successFetchPlayer(result.data));
    })
    .catch((error) => {
      dispatch(failFetchPlayer(error));
    });
};
