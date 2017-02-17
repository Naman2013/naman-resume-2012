import React, { cloneElement } from 'react';
import Header from '../components/playback/Header';
import ParentNavigation from '../components/playback/ParentNavigation';

const NAV_ITEMS = [
  {
    title: 'Recent shows',
    link: '/shows/browse-shows/recent-shows',
  },
  {
    title: 'Slooh motion',
    link: '/shows/browse-shows/slooh-motion',
  },
  {
    title: 'Upcoming shows',
    link: '/shows/browse-shows/upcoming-shows',
  },
];

function PlaybackContainer({ children }) {
  return (
    <div>
      <Header />
      <ParentNavigation
        navigationItems={NAV_ITEMS}
      />
      {
        cloneElement(children)
      }
    </div>
  );
}

export default PlaybackContainer;
