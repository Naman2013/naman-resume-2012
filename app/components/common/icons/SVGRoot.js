import React from 'react';
import PropTypes from 'prop-types';

const SVGRoot = ({ children }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

SVGRoot.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SVGRoot;
