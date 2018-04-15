import React from 'react';
import PropTypes from 'prop-types';

const Circle = ({ x, y }) => (
  <circle fill="#319fff" cx={x} cy={y} r="2" />
);

Circle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Circle;
