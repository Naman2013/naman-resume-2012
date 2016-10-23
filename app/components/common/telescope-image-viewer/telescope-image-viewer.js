import React, { Component, PropTypes } from 'react';
import InteractiveViewer from '../interactive-viewer/interactive-viewer';
import TelescopeImageLoader from '../telescope-image-loader/telescope-image-loader';
import style from './telescope-image-viewer.scss';

/**
  TODO: pass in and validate the current telescope data
  TODO: implement sse images
  TODO: implement telescope video feed
  TODO: determine whether to display image or video
*/

class HighMagnification extends Component {
  render() {

    console.log('the current telescope is...');
    console.log(this.props);

    // test image...
    //<img width="100%" src={'/assets/images/graphics/magnification-scene.jpg'}  />
    return(
      <div
        className={`telescope-image-viewer ${this.props.className}`}>

        <InteractiveViewer>
          <TelescopeImageLoader />
        </InteractiveViewer>

      </div>
    );
  }
}

export default HighMagnification;
