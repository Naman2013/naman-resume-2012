import React, { PropTypes } from 'react';
import './generic-loading-box.scss';

const GenericLoadingBox = ({ text }) => (
  <div className="generic-loading-box">
    <h3 className="message">{text}</h3>
  </div>
);

GenericLoadingBox.defaultProps = {
  text: 'Loading...',
};

GenericLoadingBox.propTypes = {
  text: PropTypes.string,
};

export default GenericLoadingBox;
