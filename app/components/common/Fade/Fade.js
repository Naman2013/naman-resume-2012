import React from 'react';
import PropTypes from 'prop-types';

const Fade = ({ children, isHidden }) => (
  <div
    className="root"
    style={{ opacity: isHidden ? 0 : 1, display: isHidden ? 'none' : 'block' }}
  >
    {children}

    <style jsx>
      {`
        .root {
          transition: opacity 0.2s ease-in-out;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
      `}
    </style>
  </div>
);

Fade.propTypes = {
  children: PropTypes.node.isRequired,
  isHidden: PropTypes.bool,
};

Fade.defaultProps = {
  isHidden: false,
};

export default Fade;
