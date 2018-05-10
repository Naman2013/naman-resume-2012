import React from 'react';
import PropTypes from 'prop-types';

const DASHED_RECT_PERCENTAGE = 0.25;
const DASHED_PERCENTAGE = 0.1;
const CENTER_MARKER_GRID_WIDTH = 12;

const FOVCenterMarker = ({ tickSpacing, canvasWidth }) => {
  const smallRectDimension = (CENTER_MARKER_GRID_WIDTH * tickSpacing);
  const largeRectWidth = ((smallRectDimension * DASHED_RECT_PERCENTAGE) + smallRectDimension);
  const smallRectX = ((canvasWidth / 2) - (smallRectDimension / 2));
  const largeRectX = ((canvasWidth / 2) - (largeRectWidth / 2));
  const Y = ((canvasWidth / 2) - (smallRectDimension / 2));
  const strokeDashArray = (smallRectDimension * DASHED_PERCENTAGE);
  return (
    <g>
      <rect
        x={largeRectX}
        y={Y}
        width={largeRectWidth}
        height={smallRectDimension}
        stroke="green"
        strokeDasharray={`${strokeDashArray}, ${strokeDashArray}`}
        fill="none"
      />
      <rect
        x={smallRectX}
        y={Y}
        width={smallRectDimension}
        height={smallRectDimension}
        stroke="green"
        fill="none"
      />
    </g>
  );
};

FOVCenterMarker.propTypes = {
  tickSpacing: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
};

export default FOVCenterMarker;
