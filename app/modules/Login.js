import { SubmissionError } from 'redux-form';
import axios from 'axios';
import { push } from 'react-router-redux';
import createReducer from './utils/createReducer';
import createAction from './utils/createAction';
import * as userActions from './User';

const LOGIN_SHOW = 'LOGIN_SHOW';
const LOGIN_HIDE = 'LOGIN_HIDE';

export const show = createAction(LOGIN_SHOW);
export const hide = createAction(LOGIN_HIDE);

export const login = loginFormValues => (dispatch) => {
  const { username, passwd } = loginFormValues;

  return axios.post('/api/users/login', {
    username,
    passwd,
  })
  .then((result) => {
    console.log('the user response object...');
    console.log(result);

    dispatch(userActions.store(result.data));
    dispatch(hide());
    dispatch(push('/'));
    window.location.reload();
  })
  .catch(error => {
    throw new SubmissionError({ _error: 'Your log in was unsuccessful. Please try again.' });
  });
};

const initialState = {
  isShowed: false,
};

export default createReducer(initialState, {
  [LOGIN_SHOW](state) {
    return {
      ...state,
      isShowed: true,
    };
  },
  [LOGIN_HIDE](state) {
    return {
      ...state,
      isShowed: false,
    };
  },
});
