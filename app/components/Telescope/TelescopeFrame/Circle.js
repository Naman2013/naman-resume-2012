import React from 'react';
import PropTypes from 'prop-types';

const Circle = ({ x, y, style }) => (
  <circle fill="aqua" cx={x} cy={y} r="1" />
);

Circle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Circle;
