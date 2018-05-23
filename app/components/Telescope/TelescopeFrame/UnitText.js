import React from 'react';
import PropTypes from 'prop-types';
import { monoFont } from 'styles/variables/fonts';

const UnitText = ({ unit, x, y }) => (
  <g>
    <text
      x={x}
      y={y}
      className="text"
    >
      {unit}
    </text>

    <style jsx>
      {`
        .text {
          fill: aqua;
          font-family: ${monoFont};
        }
      `}
    </style>
  </g>
);

UnitText.propTypes = {
  unit: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

UnitText.defaultProps = {
  x: 0,
  y: 0,
};

export default UnitText;
