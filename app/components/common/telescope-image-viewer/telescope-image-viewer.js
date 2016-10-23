import React, { Component, PropTypes } from 'react';
import InteractiveViewer from '../interactive-viewer/interactive-viewer';
import style from './telescope-image-viewer.scss';

/**
  TODO: implement sse images
  TODO: implement telescope video feed
  TODO: determine whether to display image or video
*/

class HighMagnification extends Component {
  render() {
    return(
      <div
        className={`telescope-image-viewer ${this.props.className}`}>

        <InteractiveViewer>
          <img width="100%" src={'/assets/images/graphics/magnification-scene.jpg'}  />
        </InteractiveViewer>

      </div>
    );
  }
}

export default HighMagnification;
