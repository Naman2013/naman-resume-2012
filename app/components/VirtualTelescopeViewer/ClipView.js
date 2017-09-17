import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  clipped: PropTypes.bool,
};

const defaultProps = {
  clipped: false,
};

function getClipStyle(clipped = false) {
  if (!clipped) return {};

  return {
    WebkitClipPath: 'circle(32% at center)',
    MozClipPath: 'circle(32% at center)',
    clipPath: 'circle(32% at center)',
  };
}

const ClipView = ({
  children,
  clipped,
}) => (
  <div style={getClipStyle(clipped)}>
    {children}
  </div>
);

ClipView.propTypes = propTypes;
ClipView.defaultProps = defaultProps;

export default ClipView;
