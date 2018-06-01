import React from 'react';
import Main from './Main';
import Telescopes from './Telescopes';
import Search from './Search';
import Help from './Help';
import NotificationsRedux from './Notifications.redux';
import ProfileRedux from './Profile.redux';

export const LEFT_MENU = {
  DEFAULT: {
    name: 'DEFAULT',
    title: null,
    render: () => (null),
  },
  MAIN: {
    name: 'MAIN',
    title: 'Menu',
    render: props => (<Main {...props} />),
  },
  TELESCOPES: {
    name: 'TELESCOPES',
    title: 'Telescopes',
    render: props => (<Telescopes {...props} />),
  },
  SEARCH: {
    name: 'SEARCH',
    title: 'Search',
    render: props => (<Search {...props} />),
  },
};

const RIGHT_MENU = {
  HELP: {
    name: 'HELP',
    title: 'Account info',
    render: props => (<Help {...props} />),
  },
  ALERTS: {
    name: 'ALERTS',
    title: 'Notifications',
    render: props => (<NotificationsRedux {...props} />),
  },
  PROFILE: {
    name: 'PROFILE',
    title: 'Profile',
    render: props => (<ProfileRedux {...props} />),
  },
};

export function isRight(menuName) {
  return RIGHT_MENU.hasOwnProperty(menuName);
}

export function isLeft(menuName) {
  return LEFT_MENU.hasOwnProperty(menuName);
}

export default Object.assign({}, LEFT_MENU, RIGHT_MENU);
