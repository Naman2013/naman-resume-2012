import React from 'react';
import uniqueId from 'lodash/uniqueId';
import PrimaryButton from './partials/buttons/PrimaryButton';
import SecondaryButton from './partials/buttons/SecondaryButton';

export default {
  primary: {
    component: <PrimaryButton />,
    content: [
      {
        _ID: uniqueId(),
        text: 'Home',
        anchor: '#',
      },
      {
        _ID: uniqueId(),
        text: 'Telescopes',
        anchor: '#',
      },
      {
        _ID: uniqueId(),
        text: 'My Observations',
        anchor: '#',
      },
      {
        _ID: uniqueId(),
        text: 'Guides',
        anchor: '#',
      },
      {
        _ID: uniqueId(),
        text: 'Telescopes',
        anchor: '#',
      },
      {
        _ID: uniqueId(),
        text: 'Quests',
        anchor: '#',
      },
      {
        _ID: uniqueId(),
        text: 'Shows',
        anchor: '#',
      },
    ],
  },
  secondary: {
    component: <SecondaryButton />,
    content: [
      {
        _ID: uniqueId(),
        text: 'Home',
        anchor: '#',
      },
      {
        _ID: uniqueId(),
        text: 'Telescopes',
        anchor: '#',
      },
    ],
  },
};
