import React from 'react';
import PropTypes from 'prop-types';

const Mask = ({ isVisible }) => (
  <g className="mask" style={{ opacity: (isVisible) ? 1 : 0 }}>
    <defs>
      <mask id="hole">
        <rect width="100%" height="100%" fill="white" />
        <circle r="38%" cx="50%" cy="50%" fill="black" />
      </mask>
    </defs>

    <rect id="portal" x="0" y="0" width="100%" height="100%" mask="url(#hole)" />

    <style jsx>
      {`
        .mask {
          transition: opacity 0.25s ease-in-out;
        }
      `}
    </style>
  </g>
);

Mask.propTypes = {
  isVisible: PropTypes.bool,
};

Mask.defaultProps = {
  isVisible: true,
};

export default Mask;
