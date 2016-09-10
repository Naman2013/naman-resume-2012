import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import menu from './Menu';
import user from './User';
import login from './Login';
import missions from './Missions';

export default combineReducers({
  form: reducer,
  menu,
  user,
  login,
  missions
});
