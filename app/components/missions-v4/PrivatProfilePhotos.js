import React, { cloneElement, Component } from 'react';
import PhotoHubNavigation from './PhotoHubNavigation';

class PrivatProfilePhotos extends Component {
  state = {
    filterOptions: null,
  }

  componentWillMount() {
    
  }

  handleFilterChange = () => {
    // this.setState();
  }

  render() {
    const { children, imageList } = this.props;
    const currentTab = this.props.location.pathname.split('/').pop();
    return (
      <div className="root">
        <div className="root-wrapper">
          <PhotoHubNavigation
            currentTab={currentTab}
            handleFilterChange={this.handleFilterChange}
          />
          {cloneElement(children, { currentTab })}
          <style jsx>
            {`
              .root-wrapper {
                margin: 0 42px 20px 42px;
              }
              .root {
                background-color: #f8f8f8;
              }
            `}
          </style>
        </div>
      </div>
    );
  }
}

export default PrivatProfilePhotos;
