import React from 'react';
import PropTypes from 'prop-types';
import { monoFont } from 'styles/variables/fonts';

const UnitText = ({ unit }) => (
  <g>
    <text className="text">{unit}</text>

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

export default UnitText;
