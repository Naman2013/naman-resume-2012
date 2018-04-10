import React from 'react';
import PropTypes from 'prop-types';

const Circle = ({ x, y }) => (
  <circle fill="#319fff" cx={x} cy={y} r="2" />
);

function generateGrid(count, dimension) {
  const grid = [];
  const GRID_COUNT = (count * 2);
  const SPLIT = (count / 2);
  const SPACING = (dimension / count);

  for (let i = 0; i < count; i += 1) {
    grid.push(<Circle x={i} y={i} />);
  }

  return grid;
}

const Grid = ({ count, dimension }) => (
  <g>
    {generateGrid(count, dimension)}
  </g>
);

Grid.propTypes = {
  count: PropTypes.number,
  dimension: PropTypes.number,
};

Grid.defaultProps = {
  count: 50,
  dimension: 50,
};

export default Grid;
