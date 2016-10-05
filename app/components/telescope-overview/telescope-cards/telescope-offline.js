import React from 'react';

const TelescopeOffline = ({offlineImage, offlineStatusMessage}) => (
  <div>
    <div className="image-viewer">
      <div className="count-down">
        <h4 className="counter-text">3:18</h4>
      </div>

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
