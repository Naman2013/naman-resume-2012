import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  offlineImage: PropTypes.string.isRequired,
  offlineStatusMessage: PropTypes.string,
};

const defaultProps = {
  offlineStatusMessage: '',
};

const TelescopeOffline = ({ offlineImage, offlineStatusMessage }) => (
  <div>
    <div className="image-viewer">
      <h4 className="title">Offline</h4>
      <div className="telescope-image">
        <img alt="This telescope is currently offline" src={offlineImage} width="245" height="245" />
      </div>
      <p className="telescope-status">
        {offlineStatusMessage}
      </p>
    </div>
  </div>
);

TelescopeOffline.propTypes = propTypes;
TelescopeOffline.defaultProps = defaultProps;

export default TelescopeOffline;
