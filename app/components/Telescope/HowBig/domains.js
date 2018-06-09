import React from 'react';
import { Enum } from 'enumify';

import Earth from './ReferenceObjects/Earth';
import MilkyWay from './ReferenceObjects/MilkyWay';
import SolarSystem from './ReferenceObjects/SolarSystem';
import Sun from './ReferenceObjects/Sun';

/**
  target inputs
  domain
  size of the reference

  scale - 0 to 1
  next domain is always 1
  domain comparison is some percentage of 1
*/

class Domains extends Enum {}
Domains.initEnum({
  SOLAR_SYSTEM: {
    render: props => (<Earth {...props} />),
  },
  STAR: {
    render: props => (<Sun {...props} />),
  },
  MILKY_WAY: {
    render: props => (<SolarSystem {...props} />),
  },
  DEEP_SPACE: {
    render: props => (<MilkyWay {...props} />),
  },
});

export default Domains;
