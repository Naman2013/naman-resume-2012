import React from 'react';
import { Enum } from 'enumify';
import ObjectFrame from './ReferenceObjects/ObjectFrame';

import earth from './ReferenceObjects/svg/howbig-earth.svg';
import milkyWay from './ReferenceObjects/svg/howbig-milky-way-galaxy.svg';
import sun from './ReferenceObjects/svg/howbig-sun.svg';
import solarSystem from './ReferenceObjects/svg/howbig-solar-system.svg';

class Domains extends Enum {}
Domains.initEnum({
  SOLAR_SYSTEM: {
    render: props => (
      <ObjectFrame
        svgURL={earth}
        {...props}
      />
    ),
    titleText: 'Earth',
  },
  STAR: {
    render: props => (
      <ObjectFrame
        svgURL={sun}
        {...props}
      />
    ),
    titleText: 'Sun',
  },
  MILKY_WAY: {
    render: props => (
      <ObjectFrame
        svgURL={solarSystem}
        {...props}
      />
    ),
    titleText: 'Solar System',
  },
  DEEP_SPACE: {
    render: props => (
      <ObjectFrame
        svgURL={milkyWay}
        {...props}
      />
    ),
    titleText: 'Milky Way',
  },
});

export default Domains;
