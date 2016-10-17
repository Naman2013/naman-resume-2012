import React, { Component, PropTypes } from 'react';
import InteractiveViewer from '../interactive-viewer/interactive-viewer';
import './high-magnification.scss';

class HighMagnification extends Component {
  render() {
    return(
      <div
        className={`high-magnification ${this.props.className}`}>

        <InteractiveViewer>
          <div className="main-container">
            <img src={'/assets/images/graphics/magnification-scene.jpg'}  />
          </div>
        </InteractiveViewer>

      </div>
    );
  }
}

export default HighMagnification;
