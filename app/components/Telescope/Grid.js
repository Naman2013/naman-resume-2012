import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ dimension }) => (
  <g>
    <circle fill="#319fff" cx="50" cy="50" r="2git" />
  </g>
);

Grid.propTypes = {
  dimension: PropTypes.number,
};

Grid.defaultProps = {
  dimension: 50,
};

export default Grid;
