import cookie from 'cookie';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
  * Initial state for the user
  * for now it's a mock data
  * @todo update with empty object when login flow is ready
  */
const initialState = {
  isAuthorized: false,
  user: {
    ver: "v1",
    lang: "en",
    fname: "Brandon",
    userid: "BrandonS.2016",
    username: "Frankincense",
    avatarType: "dummy",
    avatarURL: "http://images-account.slooh.com/avatar-dummy.png",
    cid: "198265",
    at: "2",
    status: "Active",
    notifyType: "all",
    notifyStatus: "unread",
    notifyCount: "0",
    school: "",
    classroom: "",
    teacher: "",
    redirect: "",
    token: "ab94b9f39049348848d807bc1a071e96919e9b1e",
    tokenExp: "",
    validate: "",
    loginError: "false",
    statusCode: "200"
  }
};

/**
  Default reducer for the user store
  @param {object} initialState
  */
export default createReducer(initialState, {
  [SET_USER](state, { user }) {
    return {
      ...user,
      isAuthorized: true,
    };
  },
  [REMOVE_USER]() {
    return {
      isAuthorized: false,
    };
  },
});

export const set = createAction(SET_USER, 'user');
export const remove = createAction(REMOVE_USER);

export function store(user) {
  localStorage.setItem('user', JSON.stringify(user));

  document.cookie = cookie.serialize('cid', user.cid, { domain: '.slooh.com' });
  document.cookie = cookie.serialize('token', user.token, { domain: '.slooh.com' });
  document.cookie = cookie.serialize('at', user.at, { domain: '.slooh.com' });
  document.cookie = cookie.serialize('fname', user.fname, { domain: '.slooh.com' });

  return (dispatch) => {
    dispatch(set(user));
  };
}

export function destroy() {
  localStorage.removeItem('user');

  document.cookie = cookie.serialize('cid', '', { domain: '.slooh.com', expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });
  document.cookie = cookie.serialize('token', '', { domain: '.slooh.com', expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });
  document.cookie = cookie.serialize('at', '', { domain: '.slooh.com', expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });
  document.cookie = cookie.serialize('fname', '', { domain: '.slooh.com', expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });

  return (dispatch) => {
    dispatch(remove());
  };
}

/**
  Is called on initial app load in App.js
  checks if user is logged in
  @todo replace below logic to reflect real user sign in
  @todo remove initialState from localStorage
  */
export function checkUser() {
  return (dispatch) => {
    localStorage.setItem( 'user', JSON.stringify(initialState) );
    const userJSON = localStorage.getItem('user');

    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(store(user));
    } else {
      dispatch(destroy());
    }
  };
}
