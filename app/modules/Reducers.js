import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import menu from './Menu';
import user from './User';
import login from './Login';

export default combineReducers({
  form: reducer,
  menu,
  user,
  login,
});
