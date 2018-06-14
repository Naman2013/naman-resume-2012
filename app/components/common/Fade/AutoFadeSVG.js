import React from 'react';
import PropTypes from 'prop-types';

const AutoFadeSVG = ({ children, duration }) => (
  <g
    className="auto-fade-svg"
    style={{
      animation: `FADE-IN ${duration}s infinite`,
    }}
  >
    {children}
    <style jsx>{`
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
