import React from 'react';
import PropTypes from 'prop-types';
import isFinite from 'lodash/isFinite';

const COVER_PERCENTAGE = 0.2;
const DASHED_RECT_PERCENTAGE = 0.25;
const DASHED_PERCENTAGE = 0.1;

const FOVCenterMarker = ({ gridDimension, gridWidth, canvasWidth }) => {
  if (!isFinite(COVER_PERCENTAGE)) return null;

  const smallRectDimension = (gridWidth * gridDimension);
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
  gridDimension: PropTypes.number.isRequired,
  gridWidth: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
};

export default FOVCenterMarker;
