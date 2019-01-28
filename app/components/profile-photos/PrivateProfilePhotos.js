/***********************************
* V4 PrivateProfilePhotos
*  The root view of privat profile -> photos
***********************************/

import React, { cloneElement } from 'react';
import PhotoHubNavigation from './PhotoHubNavigation';
import style from './PrivateProfilePhotos.style';

export default ({ children, location }) => {
  const currentTab = location.pathname.split('/').pop();
  return (
    <div style={{ background: '#f8f8f8' }}>
      <div className="root-wrapper">
        <div className="header-wrapper">
          <PhotoHubNavigation />
        </div>
        <div className="body-wrapper">
          {cloneElement(children, {
            currentTab,
          })}
        </div>
        <style jsx>{style}</style>
      </div>
    </div>
  );
};

