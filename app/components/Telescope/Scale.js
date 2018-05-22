import React from 'react';
import Polyline from 'components/SVG/Polyline';
import PropTypes from 'prop-types';
import { monoFont } from 'styles/variables/fonts';

const Scale = ({ dimension, style }) => {
  const lineLength = (dimension * 0.1);
  const x1 = (dimension - lineLength);
  const y1 = lineLength;
  const x2 = x1;
  const y2 = (y1 + lineLength);
  const x3 = (x1 - lineLength);
  const y3 = y2;

  const fontSize = (lineLength * 0.15);
  const textX = x3;
  const textY = (y2 - 5);

  const points = `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
  return (
    <g>
      <text
        style={{ fontSize }}
        className="text"
        x={textX}
        y={textY}
      >
          10-arcsecs
      </text>

      <Polyline
        strokeWidth={2}
        points={points}
        fill="none"
        stroke="aqua"
      />

      <style jsx>
        {`
          .text {
            font-family: ${monoFont};
            fill: aqua;
          }
        `}
      </style>
    </g>
  );
};

Scale.propTypes = {
  dimension: PropTypes.number.isRequired,
};
Scale.defaultProps = {};

export default Scale;
