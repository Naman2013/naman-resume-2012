/**
 * SVG group
 * contains SVG elements
 *
 * id
 * class
 * pointer-events
 * transform="translate(0 35)" - supports double point precision
 * visibility="visible" || "hidden"
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Group = ({ children }) => (
  <g>
    {children}
  </g>
);

Group.propTypes = propTypes;

export default Group;
