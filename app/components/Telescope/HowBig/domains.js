import React from 'react';
import { Enum } from 'enumify';
import ObjectFrame from './ReferenceObjects/ObjectFrame';
import nebula from './ReferenceObjects/svg/eskino-nebula.svg';
import earthSVG from './ReferenceObjects/svg/howbig-earth.svg';
import milkyWay from './ReferenceObjects/svg/howbig-milky-way.svg';

class Domains extends Enum {}
Domains.initEnum({
  SOLAR_SYSTEM: {
    render: props => (
      <ObjectFrame
        svgURL={milkyWay}
        {...props}
      />
    ),
    titleText: 'Solar System',
  },
  STAR: {
    render: props => (
      <ObjectFrame
        svgURL={nebula}
        {...props}
      />
    ),
    titleText: 'Star',
  },
  MILKY_WAY: {
    render: props => (
      <ObjectFrame
        svgURL={milkyWay}
        {...props}
      />
    ),
    titleText: 'Milky Way',
  },
  DEEP_SPACE: {
    render: props => (
      <ObjectFrame
        svgURL={nebula}
        {...props}
      />
    ),
    titleText: 'Deep Space',
  },
});

export default Domains;
