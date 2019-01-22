import React, { cloneElement, Component } from 'react';
import PhotoHubNavigation from './PhotoHubNavigation';

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
          <style jsx>
            {`
              .root-wrapper {
                margin: 0 42px 20px 42px;
              }
              .root {
                background-color: #f6f6f6;
              }
            `}
          </style>
        </div>
      </div>
    );
  }
}

export default PrivateProfilePhotos;
