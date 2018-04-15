import React from 'react';
import uniqueId from 'lodash/uniqueId';
import Circle from './Circle';

function generateLine(dimension, resolution, spacing, currentX, increment, style) {
  // start from the center and draw out from there...
  // using every

  const ROW = [];
  const MID_POINT = (dimension / 2);

  let TOP_STARTING_POINT = MID_POINT;
  let BOTTOM_STARTING_POINT = MID_POINT;

  for (let i = 0; i <= resolution; i += 1) {
    if (i % increment === 0) {
      if (i <= (resolution / 2)) {
        ROW.push(<Circle style={style} key={uniqueId()} x={currentX} y={TOP_STARTING_POINT} />);
        TOP_STARTING_POINT -= spacing;
      } else {
        ROW.push(<Circle style={style} key={uniqueId()} x={currentX} y={BOTTOM_STARTING_POINT} />);
        BOTTOM_STARTING_POINT += spacing;
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

export default GridLine;
