import { browserHistory } from 'react-router';
import cookie from 'cookie';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';

export const EXPIRATION_DAYS = 90;
export const COOKIE_PATH = '/';
export const futureDate = moment().add(EXPIRATION_DAYS, 'day').toDate();
const SET_COOKIE_SETTINGS = { domain: 'localhost', secure: false, expires: futureDate, path: COOKIE_PATH };
const END_COOKIE_SETTINGS = { domain: 'localhost', secure: false, expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path: COOKIE_PATH };

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

const UPDATE_PLAYER_VOLUME = 'UPDATE_RADIO_VOLUME';
const MUTE_PLAYER = 'MUTE_PLAYER';
const UNMUTE_PLAYER = 'UNMUTE_PLAYER';

export const set = createAction(SET_USER, 'user');
export const removeUser = createAction(REMOVE_USER);

export function store({
  cid,
  token,
  at,
  fname,
  avatarURL,
  playerMuted,
  playerVolume,
}) {
  window.document.cookie = cookie.serialize('cid', cid, SET_COOKIE_SETTINGS);
  window.document.cookie = cookie.serialize('token', token, SET_COOKIE_SETTINGS);
  window.document.cookie = cookie.serialize('at', at, SET_COOKIE_SETTINGS);
  window.document.cookie = cookie.serialize('fname', fname, SET_COOKIE_SETTINGS);
  window.document.cookie = cookie.serialize('avatarURL', avatarURL, SET_COOKIE_SETTINGS);

  return (dispatch) => {
    dispatch(set({
      cid,
      token,
      at,
      fname,
      avatarURL,
      playerMuted,
      playerVolume,
    }));
  };
}

export function destroySession() {
  window.localStorage.removeItem('user');
  window.document.cookie = cookie.serialize('cid', '', END_COOKIE_SETTINGS);
  window.document.cookie = cookie.serialize('token', '', END_COOKIE_SETTINGS);
  window.document.cookie = cookie.serialize('at', '', END_COOKIE_SETTINGS);
  window.document.cookie = cookie.serialize('fname', '', END_COOKIE_SETTINGS);
  window.document.cookie = cookie.serialize('avatarURL', '', END_COOKIE_SETTINGS);
}

function updatePlayerVolumeCookie(volume) {
  window.document.cookie = cookie.serialize('playerVolume', volume, SET_COOKIE_SETTINGS);
}

function mutePlayerCookie() {
  window.document.cookie = cookie.serialize('playerMuted', true, SET_COOKIE_SETTINGS);
}

function unmutePlayerCookie() {
  window.document.cookie = cookie.serialize('playerMuted', false, SET_COOKIE_SETTINGS);
}

export const mutePlayer = () => {
  mutePlayerCookie();
  return {
    type: MUTE_PLAYER,
  };
};

export const unmutePlayer = () => {
  unmutePlayerCookie();
  return {
    type: UNMUTE_PLAYER,
  };
};

export const updatePlayerVolume = (volume) => {
  updatePlayerVolumeCookie(volume);
  return {
    type: UPDATE_PLAYER_VOLUME,
    volume,
  };
};

export const logout = () => {
  destroySession();
  browserHistory.push('/');
  window.location.reload();
};

export function destroy() {
  destroySession();

  return (dispatch) => {
    dispatch(removeUser());
  };
}

/**
  Is called on initial app load in App.js
  checks if user is logged in
  */
export function checkUser(pathname, replace, callback) {
  return (dispatch) => {
    const {
      cid,
      token,
      at,
      fname,
      avatarURL,
      playerMuted,
      playerVolume,
    } = cookie.parse(window.document.cookie);

    const castedVolume = parseInt(playerVolume, 10) || 25;
    const castedMute = playerMuted == 'true';

    if (cid && token && at && fname) {
      dispatch(store({
        cid,
        token,
        at,
        fname,
        avatarURL,
        playerMuted: castedMute,
        playerVolume: castedVolume,
      }));
      callback();
    } else {
      callback();
    }
  };
}

const initialState = {
  isAuthorized: false,
  statusCode: 200,
  membershipType: null,
  apiError: false,
  errorCode: 0,
  playerVolume: 25,
  playerMuted: false,
};

export default createReducer(initialState, {
  [SET_USER](state, { user }) {
    return {
      ...cloneDeep(state),
      ...user,
      isAuthorized: true,
    };
  },
  [REMOVE_USER]() {
    return {
      ...initialState,
    };
  },
  [UPDATE_PLAYER_VOLUME](state, { volume }) {
    return {
      ...cloneDeep(state),
      playerVolume: volume,
    };
  },
  [MUTE_PLAYER](state) {
    return {
      ...cloneDeep(state),
      playerMuted: true,
    };
  },
  [UNMUTE_PLAYER](state) {
    return {
      ...cloneDeep(state),
      playerMuted: false,
    };
  },
});
