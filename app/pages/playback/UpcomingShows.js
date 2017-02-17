import React from 'react';
import ChildNavigation from '../../components/playback/ChildNavigation';

const NAV_ITEMS = [
  {
    title: 'All Categories',
    link: '/shows/browse-shows/upcoming-shows/all-categories',
  },
  {
    title: 'The Moon',
    link: '/shows/browse-shows/upcoming-shows/the-moon',
  },
  {
    title: 'Deep Space',
    link: '/shows/browse-shows/upcoming-shows/deep-space',
  },
  {
    title: 'Planets',
    link: '/shows/browse-shows/upcoming-shows/planets',
  },
  {
    title: 'The Sun',
    link: '/shows/browse-shows/upcoming-shows/the-sun',
  },
  {
    title: 'Comets',
    link: '/shows/browse-shows/upcoming-shows/comets',
  },
  {
    title: 'Constellations',
    link: '/shows/browse-shows/upcoming-shows/constellations',
  },
];

function UpcomingShows() {
  return (
    <div>
      <ChildNavigation
        navigationItems={NAV_ITEMS}
      />
    </div>
  );
}

export default UpcomingShows;
