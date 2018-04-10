import React from 'react';
import PropTypes from 'prop-types';

function generateGrid(count, dimension) {
  const grid = [<circle fill="#319fff" cx="50" cy="50" r="2" />];
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
