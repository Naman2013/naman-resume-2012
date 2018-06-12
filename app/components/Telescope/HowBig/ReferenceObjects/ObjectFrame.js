import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

const ObjectFrame = ({
  svgURL,
  onLoadCallback,
}) => (
  <g>
    <image
      className="object-frame-image"
      xlinkHref={svgURL}
      width="100%"
      height="100%"
      onLoad={() => { onLoadCallback(); }}
    />
  </g>
);

ObjectFrame.propTypes = {
  svgURL: PropTypes.oneOf([PropTypes.string, PropTypes.shape({})]).isRequired,
  onLoadCallback: PropTypes.func,
};

ObjectFrame.defaultProps = {
  onLoadCallback: noop,
};

export default ObjectFrame;
