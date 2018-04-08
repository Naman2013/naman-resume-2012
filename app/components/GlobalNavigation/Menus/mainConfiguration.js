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
        anchor: '/telescope-overview/3f332115-7908-11e6-a635-0eb2b1774883',
      },
      {
        _ID: uniqueId(),
        text: 'My Observations',
        anchor: '/my-pictures/missions',
      },
      {
        _ID: uniqueId(),
        text: 'Guides',
        anchor: '#',
      },
      {
        _ID: uniqueId(),
        text: 'Shows',
        anchor: '/shows/situation-room',
      },
    ],
  },
  secondary: {
    component: <SecondaryButton />,
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
