import React from 'react';

import Earth from './Earth';
import MilkyWay from './MilkyWay';
import SolarSystem from './SolarSystem';
import Sun from './Sun';

export default {
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
};
