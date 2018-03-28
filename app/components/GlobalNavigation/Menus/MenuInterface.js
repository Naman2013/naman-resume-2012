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
    render: () => (null),
  },
  MAIN: {
    name: 'MAIN',
    title: 'Menu',
    component: <Main />,
    render: props => (<Main {...props} />),
  },
  TELESCOPES: {
    name: 'TELESCOPES',
    title: 'Telescopes',
    component: <Telescopes />,
    render: props => (<Telescopes {...props} />),
  },
  SEARCH: {
    name: 'SEARCH',
    title: 'Search',
    component: <Search />,
    render: props => (<Search {...props} />),
  },
};

const RIGHT_MENU = {
  HELP: {
    name: 'HELP',
    title: 'Account info',
    component: <Help />,
    render: props => (<Help {...props} />),
  },
  ALERTS: {
    name: 'ALERTS',
    title: 'Notifications',
    component: <Notifications />,
    render: props => (<Notifications {...props} />),
  },
  PROFILE: {
    name: 'PROFILE',
    title: 'Profile',
    component: <Profile />,
    render: props => (<Profile {...props} />),
  },
};

export function isRight(menuName) {
  return RIGHT_MENU.hasOwnProperty(menuName);
}

export function isLeft(menuName) {
  return LEFT_MENU.hasOwnProperty(menuName);
}

export default Object.assign({}, LEFT_MENU, RIGHT_MENU);
