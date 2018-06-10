import React from 'react';
import { Enum } from 'enumify';
import ObjectFrame from './ReferenceObjects/ObjectFrame';

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
    render: props => (<ObjectFrame {...props} />),
  },
  STAR: {
    render: props => (<ObjectFrame {...props} />),
  },
  MILKY_WAY: {
    render: props => (<ObjectFrame {...props} />),
  },
  DEEP_SPACE: {
    render: props => (<ObjectFrame {...props} />),
  },
});

export default Domains;
