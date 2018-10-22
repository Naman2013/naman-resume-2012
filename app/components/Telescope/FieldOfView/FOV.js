import React from 'react';
import PropTypes from 'prop-types';

const DASHED_RECT_PERCENTAGE = 0.25;
const DASHED_PERCENTAGE = 0.1;

const FOV = ({
  tickSpacing, canvasWidth, gridWidth, largeRectGridWidth, stroke,
}) => {
  const smallRectDimension = (gridWidth * tickSpacing);
  const largeRectWidth = (largeRectGridWidth) ? (largeRectGridWidth * tickSpacing) : ((smallRectDimension * DASHED_RECT_PERCENTAGE) + smallRectDimension);
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
        stroke={stroke}
        strokeDasharray={`${strokeDashArray}, ${strokeDashArray}`}
        fill="none"
      />
      <rect
        x={smallRectX}
        y={Y}
        width={smallRectDimension}
        height={smallRectDimension}
        stroke={stroke}
        fill="none"
      />
    </g>
  );
};

FOV.propTypes = {
  tickSpacing: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  gridWidth: PropTypes.number.isRequired,
  largeRectGridWidth: PropTypes.number,
  stroke: PropTypes.string,
};

FOV.defaultProps = {
  stroke: 'green',
  largeRectGridWidth: null,
};

export default FOV;
