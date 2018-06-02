import React from 'react';
import PropTypes from 'prop-types';
import { monoFont } from 'styles/variables/fonts';

const UnitText = ({
  unit,
  text,
  x,
  y,
  style,
}) => (
  <g>
    <text
      {...style}
      x={x}
      y={y}
      className="text"
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      {text || Math.floor(unit)}
    </text>

    <style jsx>
      {`
        .text {
          fill: aqua;
          font-size: 10px;
          font-family: ${monoFont};
        }
      `}
    </style>
  </g>
);

UnitText.propTypes = {
  unit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  x: PropTypes.number,
  y: PropTypes.number,
};

UnitText.defaultProps = {
  x: 0,
  y: 0,
  unit: null,
  text: null,
};

export default UnitText;
