import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer } from 'redux-form';
import menu from './Menu';
import user from './User';
import login from './Login';
import missions from './Missions';
import telescopeOverview from './Telescope-Overview';

export default combineReducers({
  routing: routerReducer,
  form: reducer,
  menu,
  user,
  login,
  missions,
  telescopeOverview
});
