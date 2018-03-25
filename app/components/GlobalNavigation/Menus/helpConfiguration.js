import React from 'react';
import uniqueId from 'lodash/uniqueId';
import PrimaryButton from './partials/buttons/PrimaryButton';

export default {
  render: () => (<PrimaryButton />),
  component: <PrimaryButton />,
  content: [
    {
      _ID: uniqueId(),
      text: 'Account settings',
      anchor: '#',
    },
    {
      _ID: uniqueId(),
      text: 'Take a quick tour',
      anchor: '#',
    },
    {
      _ID: uniqueId(),
      text: 'Upgrade membership',
      anchor: '#',
    },
    {
      _ID: uniqueId(),
      text: 'Support center',
      anchor: '#',
    },
    {
      _ID: uniqueId(),
      text: 'Privacy information',
      anchor: '#',
    },
    {
      _ID: uniqueId(),
      text: 'Logout',
      anchor: '#',
    },
  ],
};
