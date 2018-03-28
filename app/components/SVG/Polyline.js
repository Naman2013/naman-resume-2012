/**
 *
 * @param fill
 * @param stroke - hexadecimal color value
 * @param points
 * @returns {*}
 * @constructor
 *
 * example
 * <polyline fill="none" stroke="black" points="0,0 0, 25" />
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  fill: PropTypes.string,
  points: PropTypes.string.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
};

const defaultProps = {
  fill: '',
  stroke: 'black',
  strokeWidth: '1',
};

const Polyline = ({
  fill,
  stroke,
  strokeWidth,
  points,
}) => (
  <polyline
    fill={fill}
    strokeWidth={strokeWidth}
    stroke={stroke}
    points={points}
  />
);

Polyline.propTypes = propTypes;
Polyline.defaultProps = defaultProps;

export default Polyline;
