import { browserHistory } from 'react-router';
import cookie from 'cookie';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';

export const EXPIRATION_DAYS = 90;
export const COOKIE_PATH = '/';
export const futureDate = moment()
  .add(EXPIRATION_DAYS, 'day')
  .toDate();

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

const SET_PLAYER = 'SET_PLAYER';
const UPDATE_PLAYER_VOLUME = 'UPDATE_RADIO_VOLUME';
const MUTE_PLAYER = 'MUTE_PLAYER';
const UNMUTE_PLAYER = 'UNMUTE_PLAYER';

export const set = createAction(SET_USER, 'user');
export const removeUser = createAction(REMOVE_USER);

const cookieD = cookieDomain || 'localhost';
const cookieSecure = !!cookieDomain;

export function store({
  reload,
  cid,
  customerUUID,
  token,
  at,
  fname,
  avatarURL,
  subscriptionPlanName,
  googleProfileId,
}) {
  window.document.cookie = cookie.serialize('cid', cid, {
    domain: cookieD,
    secure: cookieSecure,
    expires: futureDate,
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('customerUUID', customerUUID, {
    domain: cookieD,
    secure: cookieSecure,
    expires: futureDate,
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('token', token, {
    domain: cookieD,
    secure: cookieSecure,
    expires: futureDate,
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('at', at, {
    domain: cookieD,
    secure: cookieSecure,
    expires: futureDate,
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('fname', fname, {
    domain: cookieD,
    secure: cookieSecure,
    expires: futureDate,
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('avatarURL', avatarURL, {
    domain: cookieD,
    secure: cookieSecure,
    expires: futureDate,
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize(
    'subscriptionPlanName',
    subscriptionPlanName,
    {
      domain: cookieD,
      secure: cookieSecure,
      expires: futureDate,
      path: COOKIE_PATH,
    }
  );
  window.document.cookie = cookie.serialize(
    'googleProfileId',
    googleProfileId,
    {
      domain: cookieD,
      secure: cookieSecure,
      expires: futureDate,
      path: COOKIE_PATH,
    }
  );
  if (reload) {
    window.location.reload();
  }
  return dispatch => {
    dispatch(
      set({
        cid,
        customerUUID,
        token,
        at,
        fname,
        avatarURL,
        subscriptionPlanName,
        googleProfileId,
      })
    );
  };
}

const setPlayerState = ({ playerMuted, playerVolume }) => ({
  type: SET_PLAYER,
  playerMuted,
  playerVolume,
});

export function destroySession() {
  window.localStorage.removeItem('user');
  window.document.cookie = cookie.serialize('cid', '', {
    domain: cookieD,
    secure: cookieSecure,
    expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'),
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('customerUUID', '', {
    domain: cookieD,
    secure: cookieSecure,
    expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'),
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('token', '', {
    domain: cookieD,
    secure: cookieSecure,
    expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'),
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('at', '', {
    domain: cookieD,
    secure: cookieSecure,
    expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'),
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('fname', '', {
    domain: cookieD,
    secure: cookieSecure,
    expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'),
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('avatarURL', '', {
    domain: cookieD,
    secure: cookieSecure,
    expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'),
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('subscriptionPlanName', '', {
    domain: cookieD,
    secure: cookieSecure,
    expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'),
    path: COOKIE_PATH,
  });
  window.document.cookie = cookie.serialize('googleProfileId', '', {
    domain: cookieD,
    secure: cookieSecure,
    expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'),
    path: COOKIE_PATH,
  });
}

function updatePlayerVolumeCookie(volume) {
  window.document.cookie = cookie.serialize('playerVolume', volume, {
    domain: cookieD,
    secure: cookieSecure,
    expires: futureDate,
    path: COOKIE_PATH,
  });
}

function mutePlayerCookie() {
  window.document.cookie = cookie.serialize('playerMuted', true, {
    domain: cookieD,
    secure: cookieSecure,
    expires: futureDate,
    path: COOKIE_PATH,
  });
}

function unmutePlayerCookie() {
  window.document.cookie = cookie.serialize('playerMuted', false, {
    domain: cookieD,
    secure: cookieSecure,
    expires: futureDate,
    path: COOKIE_PATH,
  });
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

export const updatePlayerVolume = volume => {
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

  return dispatch => {
    dispatch(removeUser());
  };
}

/**
  Is called on initial app load in App.js
  checks if user is logged in
  */
export function checkUser(pathname, replace, callback) {
  return dispatch => {
    const {
      cid,
      customerUUID,
      token,
      at,
      fname,
      avatarURL,
      playerMuted,
      playerVolume,
      subscriptionPlanName,
      googleProfileId,
    } = cookie.parse(window.document.cookie);

    const castedVolume = parseInt(playerVolume, 10) || 25;
    const castedMute = playerMuted == 'true';

    // sets up the initial audio player volume and mute
    dispatch(
      setPlayerState({
        playerVolume: castedVolume,
        playerMuted: castedMute,
      })
    );

    // if we have a user to set, set it
    if (cid && token && at && fname) {
      dispatch(
        store({
          cid,
          customerUUID,
          token,
          at,
          fname,
          avatarURL,
          subscriptionPlanName,
          googleProfileId,
        })
      );
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
  [SET_PLAYER](state, { playerVolume, playerMuted }) {
    return {
      ...cloneDeep(state),
      playerVolume,
      playerMuted,
    };
  },
  [REMOVE_USER](state) {
    return {
      ...cloneDeep(state),
      isAuthorized: false,
      statusCode: 200,
      membershipType: null,
      apiError: false,
      errorCode: 0,
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
