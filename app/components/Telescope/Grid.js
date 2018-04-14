import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

const Circle = ({ x, y }) => (
  <circle fill="#319fff" cx={x} cy={y} r="1" />
);

Circle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

function generateGrid(count, dimension) {
  const POINTS = [];
  const SPACING = (dimension / count);
  const TOTAL_POINTS = (count * count);

  let Y_BASE = 0;
  let X_BASE = 0;

  for (let i = 0; i < TOTAL_POINTS; i += 1) {
    if (i % count === 0) {
      X_BASE = 0;
      Y_BASE += SPACING;
    }
    POINTS.push(<Circle x={X_BASE} y={Y_BASE} />);
    X_BASE += SPACING;
  }

  return POINTS;
}

const Grid = ({ resolution, dimension }) => (
  <g>
    {generateGrid(resolution, dimension)}
  </g>
);

Grid.propTypes = {
  resolution: PropTypes.number,
  dimension: PropTypes.number,
};

Grid.defaultProps = {
  resolution: 50,
  dimension: 50,
};

export default Grid;
