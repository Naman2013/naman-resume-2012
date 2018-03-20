import React from 'react';
import Main from './Main';
import Telescopes from './Telescopes';
import Search from './Search';
import Help from './Help';
import Notifications from './Notifications';
import Profile from './Profile';

export const LEFT_MENU = {
  DEFAULT: {
    name: 'DEFAULT',
    title: null,
    component: null,
  },
  MAIN: {
    name: 'MAIN',
    title: 'Menu',
    component: <Main />,
  },
  TELESCOPES: {
    name: 'TELESCOPES',
    title: 'Telescopes',
    component: <Telescopes />,
  },
  SEARCH: {
    name: 'SEARCH',
    title: 'Search',
    component: <Search />
  },
};

const RIGHT_MENU = {
  HELP: {
    name: 'HELP',
    title: 'Help',
    component: <Help />,
  },
  ALERTS: {
    name: 'ALERTS',
    title: 'Notifications',
    component: <Notifications />,
  },
  PROFILE: {
    name: 'PROFILE',
    title: 'Profile',
    component: <Profile />,
  },
};

export function isRight(menuName) {
  return RIGHT_MENU.hasOwnProperty(menuName);
}

export function isLeft(menuName) {
  return LEFT_MENU.hasOwnProperty(menuName);
}

export default Object.assign({}, LEFT_MENU, RIGHT_MENU);
