import React from 'react';
import PropTypes from 'prop-types';
import './generic-loading-box.scss';

const GenericLoadingBox = ({ text, height }) => (
  <div className="generic-loading-box" style={height && { height }}>
    <h3 className="message">{text}</h3>
  </div>
);

GenericLoadingBox.defaultProps = {
  text: 'Loading...',
};

GenericLoadingBox.propTypes = {
  text: PropTypes.string,
  height: PropTypes.string,
};

export default GenericLoadingBox;
