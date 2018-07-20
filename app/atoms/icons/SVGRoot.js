import React from 'react';
import PropTypes from 'prop-types';

const SVGRoot = ({
  children,
  width,
  height,
}) => (
  <svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox={`0 0 ${width} ${height}`}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

SVGRoot.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
};

SVGRoot.defaultProps = {
  width: 10,
  height: 10,
  viewBox: '0 0 10 10',
};

export default SVGRoot;
