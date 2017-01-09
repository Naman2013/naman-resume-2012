import React from 'react';
import style from './telescope-offline.scss';

const TelescopeOffline = ({ imageSource }) => {
  return(
    <div className="telescope-details-offline">
      <h2>OFFLINE</h2>
      <div>
        <img height="350" src={imageSource} />
      </div>
    </div>
  );
};

export default TelescopeOffline;
