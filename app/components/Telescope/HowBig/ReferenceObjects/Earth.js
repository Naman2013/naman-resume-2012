import React from 'react';
import PropTypes from 'prop-types';
import earthImage from './svg/earth.svg';

const Earth = ({ x, y }) => (
  <g>
    <image xlinkHref={earthImage} width="100%" height="100%" />
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
