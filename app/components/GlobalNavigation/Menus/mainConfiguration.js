import React from 'react';
import uniqueId from 'lodash/uniqueId';
import PrimaryButton from './partials/buttons/PrimaryButton';
import SecondaryButton from './partials/buttons/SecondaryButton';

export default {
  primary: {
    render: props => (<PrimaryButton {...props} />),
    content: [
      {
        _ID: uniqueId(),
        text: 'Home',
        anchor: '/',
      },
      {
        _ID: uniqueId(),
        text: 'Telescopes',
        anchor: '/telescopes',
      },
      {
        _ID: uniqueId(),
        text: 'My Observations',
        anchor: '/my-pictures',
      },
      {
        _ID: uniqueId(),
        text: 'Guides',
        anchor: '/guides',
      },
      {
        _ID: uniqueId(),
        text: 'Quests',
        anchor: '/quests',
      },
      {
        _ID: uniqueId(),
        text: 'Shows',
        anchor: '/shows',
      },
      {
        _ID: uniqueId(),
        text: 'Stories',
        anchor: '/stories',
      },
    ],
  },
  secondary: {
    render: props => (<SecondaryButton {...props} />),
    content: [
      {
        _ID: uniqueId(),
        text: 'About Slooh',
        anchor: '/welcome',
      },
      {
        _ID: uniqueId(),
        text: 'Memberships',
        anchor: '/joinApprentice.php?action=joinmenu',
      },
      {
        _ID: uniqueId(),
        text: 'Partner with Slooh',
        anchor: '/about/mission',
      },
      {
        _ID: uniqueId(),
        text: 'Slooh careers',
        anchor: '/about/job',
      },
    ],
  },
};
