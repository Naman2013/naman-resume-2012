import React from 'react';
import PropTypes from 'prop-types';
import Polyline from '../../SVG/Polyline';

const STROKE_WIDTH = 3;

const CenterLine = ({ points, style }) => (
  <Polyline
    points={points}
    strokeWidth={STROKE_WIDTH}
    {...style}
  />
);

CenterLine.propTypes = {
  points: PropTypes.string.isRequired,
};

export default CenterLine;
