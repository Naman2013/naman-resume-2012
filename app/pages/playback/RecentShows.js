import React from 'react';
import ChildNavigation from '../../components/playback/ChildNavigation';
import PlaybackVideoViewer from '../../components/playback/PlaybackVideoViewer';

const NAV_ITEMS = [
  {
    title: 'All Categories',
    link: '/shows/browse-shows/recent-shows/all-categories',
  },
  {
    title: 'The Moon',
    link: '/shows/browse-shows/recent-shows/the-moon',
  },
  {
    title: 'Deep Space',
    link: '/shows/browse-shows/recent-shows/deep-space',
  },
  {
    title: 'Planets',
    link: '/shows/browse-shows/recent-shows/planets',
  },
  {
    title: 'The Sun',
    link: '/shows/browse-shows/recent-shows/the-sun',
  },
  {
    title: 'Comets',
    link: '/shows/browse-shows/recent-shows/comets',
  },
  {
    title: 'Constellations',
    link: '/shows/browse-shows/recent-shows/constellations',
  },
];

function RecentShows() {
  return (
    <div>
      <ChildNavigation
        navigationItems={NAV_ITEMS}
      />

      <PlaybackVideoViewer />
    </div>
  );
}

export default RecentShows;
