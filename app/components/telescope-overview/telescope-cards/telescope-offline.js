import React from 'react';

const TelescopeOffline = ({offlineImage, offlineStatusMessage}) => (
  <div>
    <div className="image-viewer">
      <h4 className="title">Offline</h4>
      <div className="telescope-image">
        <img src={offlineImage} width="245" height="245" />
      </div>
      <p className="telescope-status">
        {offlineStatusMessage}
      </p>
    </div>
  </div>
)

export default TelescopeOffline;
