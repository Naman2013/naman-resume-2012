/***********************************
* V4 PrivatProfilePhotos
*  The root view of privat profile -> photos
***********************************/

import React, { cloneElement, Component } from 'react';
import PhotoHubNavigation from './PhotoHubNavigation';
import style from './PrivateProfilePhotos.style';

class PrivateProfilePhotos extends Component {
  state = {
    
  }

  render() {
    const { children } = this.props;
    const currentTab = this.props.location.pathname.split('/').pop();
    return (
      <div style={{ background: '#f8f8f8' }}>
        <div className="root-wrapper">
          <PhotoHubNavigation
            currentTab={currentTab}
          />
          {cloneElement(children, { currentTab })}
          <style jsx>{style}</style>
        </div>
      </div>
    );
  }
}

export default PrivateProfilePhotos;
