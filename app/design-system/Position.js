import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  position: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  bottom: PropTypes.string,
  right: PropTypes.string,
};

const defaultProps = {
  position: 'inline',
  top: '0px',
  left: '0px;',
  bottom: '0px',
  right: '0px',
};

const Position = ({ position, top, left, bottom, right, children }) => (
  <div style={{ position, top, left, bottom, right }}>
    { children }
  </div>
);

Position.propTypes = propTypes;
Position.defaultProps = defaultProps;

export default Position;
