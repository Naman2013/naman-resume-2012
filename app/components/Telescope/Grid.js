import React from 'react';
import PropTypes from 'prop-types';

const Circle = ({ x, y }) => (
  <circle fill="#319fff" cx={x} cy={y} r="1" />
);

Circle.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};


/**
 * A grid is drawn from left to right, top to bottom
 * @param parameters
 * @returns {Array}
 */
function generateGrid(parameters) {
  const { resolution, increment, dimension } = parameters;
  const POINTS = [];
  const SPACING = (dimension / resolution);
  const TOTAL_POINTS = (resolution * resolution);

  let Y_BASE = 0;
  let X_BASE = 0;

  for (let i = 0; i < TOTAL_POINTS; i += 1) {
    if (i % resolution === 0) {
      X_BASE = 0;
      Y_BASE += SPACING;
    }
    POINTS.push(<Circle x={X_BASE} y={Y_BASE} />);
    X_BASE += SPACING;
  }

  return POINTS;
}

const Grid = ({ resolution, increment, dimension }) => (
  <g>
    {generateGrid({ resolution, increment, dimension })}
  </g>
);

Grid.propTypes = {
  resolution: PropTypes.number,
  increment: PropTypes.number,
  dimension: PropTypes.number,
};

Grid.defaultProps = {
  resolution: 50,
  increment: 5,
  dimension: 50,
};

export default Grid;
