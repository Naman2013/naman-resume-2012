import React from 'react';
import Main from './Main';
import Telescopes from './Telescopes';
import Search from './Search';
import Help from './Help';
import Alerts from './Alerts';
import Profile from './Profile';

export const LEFT_MENU = {
  DEFAULT: 'DEFAULT',
  MAIN: 'MAIN',
  TELESCOPES: 'TELESCOPES',
  SEARCH: 'SEARCH',
};

export const RIGHT_MENU = {
  HELP: 'HELP',
  ALERTS: 'ALERTS',
  PROFILE: 'PROFILE',
};

export function isRight(menuName) {
  return RIGHT_MENU.hasOwnProperty(menuName);
}

export function isLeft(menuName) {
  return LEFT_MENU.hasOwnProperty(menuName);
}

export const menuComponents = {
  DEFAULT: null,
  MAIN: <Main />,
  TELESCOPES: <Telescopes />,
  SEARCH: <Search />,
  HELP: <Help />,
  ALERTS: <Alerts />,
  PROFILE: <Profile />,
};

export default Object.assign({}, LEFT_MENU, RIGHT_MENU);
