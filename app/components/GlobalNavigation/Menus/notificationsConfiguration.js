import React from 'react';
import uniqueId from 'lodash/uniqueId';
import MissionTile from './partials/MissionTile';

export default {
  component: <MissionTile />,
  content: [
    {
      _ID: uniqueId(),
      mainTitle: 'Your mission is about to begin',
      objectTitle: 'Chile one',
      objectSubTitle: 'Belongs to solar system',
      anchorText: 'Go to Telescope channel',
      anchor: '#',
      occurred: '3 hours ago',
    },
    {
      _ID: uniqueId(),
      mainTitle: 'Your mission is about to begin',
      objectTitle: 'Chile one',
      anchorText: 'Go to Telescope channel',
      anchor: '#',
      occurred: '3 hours ago',
    },
    {
      _ID: uniqueId(),
      mainTitle: 'Your mission is about to begin',
      objectTitle: 'Chile one',
      anchorText: 'Go to Telescope channel',
      anchor: '#',
      occurred: '3 hours ago',
    },
    {
      _ID: uniqueId(),
      mainTitle: 'Your mission is about to begin',
      objectTitle: 'Chile one',
      anchorText: 'Go to Telescope channel',
      anchor: '#',
      occurred: '3 hours ago',
    },
    {
      _ID: uniqueId(),
      mainTitle: 'Your mission is about to begin',
      objectTitle: 'Chile one',
      anchorText: 'Go to Telescope channel',
      anchor: '#',
      occurred: '3 hours ago',
    },
  ],
};
