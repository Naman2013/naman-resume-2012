import React from 'react';
import PropTypes from 'prop-types';

const Earth = ({ x, y, r }) => (
  <g>
    <circle cx={x} cy={y} r={r} />
  </g>
);


Earth.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
};
Earth.defaultProps = {
  x: 0,
  y: 0,
  r: 50,
};
export default Earth;
