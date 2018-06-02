import React from 'react';
import PropTypes from 'prop-types';

const Fade = ({ children, isHidden }) => (
  <div className="root" style={{ opacity: (isHidden) ? 0 : 1 }}>
    {children}

    <style jsx>{`
      .root {
        transition: opacity .2s ease-in-out;
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
