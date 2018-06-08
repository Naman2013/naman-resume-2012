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
