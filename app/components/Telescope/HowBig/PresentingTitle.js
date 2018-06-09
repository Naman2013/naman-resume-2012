import React from 'react';
import PropTypes from 'prop-types';
import { monoFont } from 'styles/variables/fonts';

const PresentingTitle = ({ dimension }) => (
  <g>
    <text
      x={(dimension / 2)}
      y={(dimension - 100)}
      alignmentBaseline="middle"
      textAnchor="middle"
      className="text"
    >
      HOW BIG?
    </text>

    <style jsx>
      {`
        .text {
          font-family: ${monoFont};
          fill: aqua;
          font-size: 20px;
        }
      `}
    </style>
  </g>
);

PresentingTitle.propTypes = {
  dimension: PropTypes.number.isRequired,
};

export default PresentingTitle;
