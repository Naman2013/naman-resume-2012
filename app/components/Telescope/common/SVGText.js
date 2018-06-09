import React from 'react';
import PropTypes from 'prop-types';
import { monoFont } from 'styles/variables/fonts';

const SVGText = ({
  text,
  x,
  y,
  displayProperties,
}) => (
  <g>
    <text
      style={Object.assign(displayProperties, SVGText.defaultProps.displayProperties)}
      x={x}
      y={y}
      alignmentBaseline="middle"
      textAnchor="middle"
    >
      {text}
    </text>
  </g>
);

SVGText.propTypes = {
  text: PropTypes.string.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  displayProperties: PropTypes.shape({
    fill: PropTypes.string,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.string,
  }),
};

SVGText.defaultProps = {
  x: 0,
  y: 0,
  displayProperties: {
    fill: 'aqua',
    fontFamily: monoFont,
    fontSize: '20px',
  },
};

export default SVGText;
