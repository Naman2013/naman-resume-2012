import cookie from 'cookie';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

const initialState = {
  isAuthorized: false,
};

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

export function checkUser() {
  return (dispatch) => {
    const userJSON = localStorage.getItem('user');

    if (userJSON) {
      const user = JSON.parse(userJSON);

      dispatch(store(user));
    } else {
      dispatch(destroy());
    }
  };
}
