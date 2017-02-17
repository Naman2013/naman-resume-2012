import React from 'react';
import ChildNavigation from '../../components/playback/ChildNavigation';

const NAV_ITEMS = [
  {
    title: 'All Categories',
    link: '/shows/browse-shows/slooh-motion/all-categories',
  },
  {
    title: 'The Moon',
    link: '/shows/browse-shows/slooh-motion/the-moon',
  },
  {
    title: 'Deep Space',
    link: '/shows/browse-shows/slooh-motion/deep-space',
  },
  {
    title: 'Planets',
    link: '/shows/browse-shows/slooh-motion/planets',
  },
  {
    title: 'The Sun',
    link: '/shows/browse-shows/slooh-motion/the-sun',
  },
  {
    title: 'Comets',
    link: '/shows/browse-shows/slooh-motion/comets',
  },
  {
    title: 'Constellations',
    link: '/shows/browse-shows/slooh-motion/constellations',
  },
];

function SloohMotion() {
  return (
    <div>
      <ChildNavigation
        navigationItems={NAV_ITEMS}
      />
    </div>
  );
}

export default SloohMotion;
