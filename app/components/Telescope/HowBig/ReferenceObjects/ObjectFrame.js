import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

const ObjectFrame = ({
  svgURL,
  onLoadCallback,
  width,
  height,
  x,
  y,
}) => (
  <g>
    <image
      className="object-frame-image"
      xlinkHref={svgURL}
      width={width}
      height={height}
      x={x}
      y={y}
      onLoad={() => { onLoadCallback(); }}
    />
  </g>
);

ObjectFrame.propTypes = {
  svgURL: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]).isRequired,
  onLoadCallback: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
};

ObjectFrame.defaultProps = {
  onLoadCallback: noop,
  width: 20,
  height: 20,
  x: 0,
  y: 0,
};

export default ObjectFrame;
