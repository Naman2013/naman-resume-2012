import React from 'react';
import PropTypes from 'prop-types';

const AutoFadeSVG = ({ children, duration }) => (
  <g className="auto-fade-svg">
    {children}
    <style jsx>{`
      .auto-fade-svg {
        animation: FADE-IN ${duration}s infinite;
      }

      @keyframes FADE-IN {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }
    `}
    </style>
  </g>
);

AutoFadeSVG.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.number,
};

AutoFadeSVG.defaultProps = {
  duration: 5,
};

export default AutoFadeSVG;
