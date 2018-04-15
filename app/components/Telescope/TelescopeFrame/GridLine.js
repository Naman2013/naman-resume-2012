import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import Circle from './Circle';

function generateLine(dimension, resolution, spacing, currentX, increment, style) {
  const ROW = [];
  const MID_POINT = (dimension / 2);

  let TOP_STARTING_POINT = MID_POINT;
  let BOTTOM_STARTING_POINT = MID_POINT;

  for (let i = 0; i <= resolution; i += 1) {
    if (i % increment === 0) {
      if (TOP_STARTING_POINT > 0) {
        ROW.push(<Circle style={style} key={uniqueId()} x={currentX} y={TOP_STARTING_POINT} />);
        TOP_STARTING_POINT -= (spacing * increment);
      } else {
        ROW.push(<Circle style={style} key={uniqueId()} x={currentX} y={BOTTOM_STARTING_POINT} />);
        BOTTOM_STARTING_POINT += (spacing * increment);
      }
    }
  }

  return ROW;
}

const GridLine = ({
  dimension, resolution, spacing, currentX, increment, style,
}) => (
  <g>
    {generateLine(dimension, resolution, spacing, currentX, increment, style)}
  </g>
);

GridLine.propTypes = {
  dimension: PropTypes.number.isRequired,
  resolution: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
  currentX: PropTypes.number.isRequired,
  increment: PropTypes.number.isRequired,
  style: PropTypes.object,
};

GridLine.defaultProps = {
  style: {},
};

export default GridLine;
