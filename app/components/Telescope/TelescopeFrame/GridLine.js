import React from 'react';
import uniqueId from 'lodash/uniqueId';
import Circle from './Circle';

function generateLine(dimension, resolution, spacing, currentX) {
  // start from the center and draw out from there...
  // using every

  const MID_POINT = (dimension / 2);

  return [<Circle key={uniqueId()} x={currentX} y={MID_POINT} />];
}

const GridLine = ({ dimension, resolution, spacing, currentX }) => (
  <g>
    {generateLine(dimension, resolution, spacing, currentX)}
  </g>
);

export default GridLine;
