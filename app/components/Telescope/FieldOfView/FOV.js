import React from 'react';
import PropTypes from 'prop-types';
import UnitText from '../TelescopeFrame/UnitText';

const DASHED_RECT_PERCENTAGE = 0.25;
const DASHED_PERCENTAGE = 0.1;

const FOV = ({
  tickSpacing,
  canvasWidth,
  gridWidth,
  largeRectGridWidth,
  stroke,
  telescope,
}) => {
  const smallRectDimension = gridWidth * tickSpacing;
  const largeRectWidth = largeRectGridWidth
    ? largeRectGridWidth * tickSpacing
    : smallRectDimension * DASHED_RECT_PERCENTAGE + smallRectDimension;
  const smallRectX = canvasWidth / 2 - smallRectDimension / 2;
  const largeRectX = canvasWidth / 2 - largeRectWidth / 2;
  const Y = canvasWidth / 2 - smallRectDimension / 2;
  const strokeDashArray = smallRectDimension * DASHED_PERCENTAGE;
  let fontSize = Math.floor(smallRectDimension / 15) - 1;
  if (fontSize >= 40) {
    fontSize = 40;
  }

  return (
    <g>
      <rect
        x={largeRectX}
        y={Y}
        width={largeRectWidth}
        height={smallRectDimension}
        stroke={stroke}
        fill="none"
      />

      {showArrows && (
        <g>
          <line
            x1={largeRectX + 10}
            y1={Y + smallRectDimension / 6}
            x2={largeRectX + largeRectWidth / 2 - 4 * fontSize}
            y2={Y + smallRectDimension / 6}
            stroke={stroke}
            strokeWidth="1.5"
            markerStart="url(#startarrow)"
          />

          <line
            x1={largeRectX + largeRectWidth / 2 + 4 * fontSize}
            y1={Y + smallRectDimension / 6}
            x2={largeRectX + largeRectWidth - 10}
            y2={Y + smallRectDimension / 6}
            stroke={stroke}
            strokeWidth="1.5"
            markerEnd="url(#endarrow)"
          />

          <line
            x1={largeRectX + largeRectWidth / 10}
            y1={Y + 12}
            x2={largeRectX + largeRectWidth / 10}
            y2={Y + smallRectDimension / 2 - 4 * fontSize}
            stroke={stroke}
            strokeWidth="1.5"
            markerStart="url(#startarrow)"
          />
          <line
            x1={largeRectX + largeRectWidth / 10}
            y1={Y + smallRectDimension / 2 + 4 * fontSize}
            x2={largeRectX + largeRectWidth / 10}
            y2={Y + smallRectDimension - 12}
            stroke={stroke}
            strokeWidth="1.5"
            markerEnd="url(#endarrow)"
          />
          <UnitText
            x={largeRectX + largeRectWidth / 2}
            y={Y + smallRectDimension / 2}
            style={{ fill: stroke, fontFamily: 'BrandonGrotesque' }}
            text={telescope.topName}
            fontSize={fontSize}
          />
          <UnitText
            x={largeRectX + largeRectWidth / 2}
            y={Y + smallRectDimension / 2 + fontSize}
            style={{ fill: stroke, fontFamily: 'BrandonGrotesque' }}
            text={telescope.bottomName}
            fontSize={fontSize}
          />
          <UnitText
            fontSize={fontSize}
            style={{ fill: stroke, fontFamily: 'BrandonGrotesque' }}
            x={largeRectX + largeRectWidth / 2}
            y={Y + smallRectDimension / 6}
            text={`${telescope.FOV.horizontal} arcminutes`}
          />

          <UnitText
            fontSize={fontSize}
            style={{
              fill: stroke,
              transform: 'rotate(-90)',
              textAnchor: 'start',
              fontFamily: 'BrandonGrotesque',
            }}
            x={-Y - smallRectDimension / 2}
            y={largeRectX + largeRectWidth / 10}
            text={`${telescope.FOV.vertical} arcminutes`}
          />
        </g>
      )}
      {/* <rect
        x={smallRectX}
        y={Y}
        width={smallRectDimension}
        height={smallRectDimension}
        stroke={stroke}
        fill="none"
      /> */}
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
