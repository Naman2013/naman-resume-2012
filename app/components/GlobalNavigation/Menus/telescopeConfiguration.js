import React from 'react';
import uniqueId from 'lodash/uniqueId';
import PrimaryButton from './partials/buttons/PrimaryButton';

export default {
  component: <PrimaryButton />,
  content: [
    {
      _ID: uniqueId(),
      text: 'Chile one',
      anchor: '#',
    },
    {
      _ID: uniqueId(),
      text: 'Canary one',
      anchor: '#',
    },
    {
      _ID: uniqueId(),
      text: 'Canary two',
      anchor: '#',
    },
    {
      _ID: uniqueId(),
      text: 'Canary three',
      anchor: '#',
    },
  ],
};
