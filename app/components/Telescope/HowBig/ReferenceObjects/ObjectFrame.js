import React from 'react';
import PropTypes from 'prop-types';

const ObjectFrame = ({
  x,
  y,
  scale,
  svgURL,
}) => (
  <g>
    <image
      x={x}
      y={y}
      xlinkHref={svgURL}
      width="100%"
      height="100%"
      style={{ transform: `scale(${scale})` }}
    />
  </g>
);

ObjectFrame.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  scale: PropTypes.number,
  svgURL: PropTypes.string.isRequired,
};

ObjectFrame.defaultProps = {
  x: 0,
  y: 0,
  scale: 1,
};

export default ObjectFrame;
