import React from 'react';
import Circle from './Circle';

const GridLine = ({ dimension, resolution, spacing }) => (
  <g>
    <Circle x={100} y={100} />
  </g>
);

export default GridLine;
