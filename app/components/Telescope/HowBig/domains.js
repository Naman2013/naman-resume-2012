import React from 'react';
import { Enum } from 'enumify';

import Earth from './referenceObjects/Earth';
import MilkyWay from './referenceObjects/MilkyWay';
import SolarSystem from './referenceObjects/SolarSystem';
import Sun from './referenceObjects/Sun';

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
