import React, { Component, PropTypes } from 'react';
import InteractiveViewer from '../interactive-viewer/interactive-viewer';
import './high-magnification.scss';

class HighMagnification extends Component {
  render() {
    return(
      <div
        className={`high-magnification ${this.props.className}`}>

        <InteractiveViewer>
          <img width="100%" src={'/assets/images/graphics/magnification-scene.jpg'}  />
        </InteractiveViewer>

      </div>
    );
  }
}

export default HighMagnification;
