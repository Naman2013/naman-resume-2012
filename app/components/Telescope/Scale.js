import React from 'react';
import Polyline from 'components/SVG/Polyline';
import PropTypes from 'prop-types';
import { monoFont } from 'styles/variables/fonts';

const Scale = ({ dimension, scale, style }) => {
  const lineLength = (dimension * 0.06);
  const x1 = (dimension - lineLength);
  const y1 = lineLength;
  const x2 = x1;
  const y2 = (y1 + scale);
  const x3 = (x1 - scale);
  const y3 = y2;

  const fontSize = (scale * 0.17);
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
          5-arcmins
      </text>

      <text
        style={{ fontSize }}
        className="text"
        x={(x3 - (fontSize))}
        y={(y3 + (fontSize * 0.35))}
      >
          E
      </text>

      <text
        style={{ fontSize }}
        className="text"
        x={x1 - (fontSize * 0.23)}
        y={(y1 - (fontSize * 0.35))}
      >
          N
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
  scale: PropTypes.number.isRequired,
};

export default Scale;
