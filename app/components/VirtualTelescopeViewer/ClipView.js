import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  clipped: PropTypes.bool,
};

const defaultProps = {
  clipped: false,
};

const CLIP_PERCENTAGE = '38';

function getClipStyle(clipped = false) {
  if (!clipped) return {};

  return {
    WebkitClipPath: `circle(${CLIP_PERCENTAGE}% at center)`,
    MozClipPath: `circle(${CLIP_PERCENTAGE}% at center)`,
    clipPath: `circle(${CLIP_PERCENTAGE}% at center)`,
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
