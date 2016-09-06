import { SubmissionError } from 'redux-form';
import superagent from '../utils/superagent';
import createReducer from './utils/createReducer';
import creatAction from './utils/creatAction';
import * as userActions from './User';

const LOGIN_SHOW = 'LOGIN_SHOW';
const LOGIN_HIDE = 'LOGIN_HIDE';

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

export const show = creatAction(LOGIN_SHOW, 'index');
export const hide = creatAction(LOGIN_HIDE);

export async function login(values, dispatch) {
  const { body, body: { loginError } } = await superagent
    .post('users/login')
    .type('form')
    .send(values);

  if (loginError === 'true') {
    throw new SubmissionError({ _error: 'Your log in was unsuccessful. Please try again.' });
  }

  dispatch(hide());

  dispatch(userActions.store(body));
}
