import React, { Component, PropTypes } from 'react';
import InteractiveViewer from '../interactive-viewer/interactive-viewer';
import TelescopeImageLoader from '../telescope-image-loader/telescope-image-loader';
import style from './telescope-image-viewer.scss';

import generateSseImageLoader from '../../../utils/generate-sse-image-source';

/**
  TODO: implement telescope video feed
  TODO: determine whether to display image or video
*/

class TelescopeImageViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clipped: false,
    };
  }

  toggleClipping(event) {
    const { clipped } = this.state;
    this.setState({
      clipped: !clipped,
    });
  }

  render() {

    // console.log('the current telescope is...');
    // console.log(this.props);

    const {
      telePort,
      teleSystem,
      teleId,
      teleFade, } = this.props;

    const { clipped } = this.state;

    const teleThumbWidth = '875';
    const imageSource = generateSseImageLoader(teleSystem, telePort);
    const isClipped = clipped ? 'clipped' : '';

    console.log(isClipped);

    return(
      <div
        className={`telescope-image-viewer ${isClipped}`}>

        <InteractiveViewer
          handleClipping={this.toggleClipping.bind(this)}>

          <TelescopeImageLoader
            imageSource={imageSource}
            teleId={teleId}
            teleThumbWidth={teleThumbWidth}
            teleFade={teleFade}
            clipped={false} />

        </InteractiveViewer>

      </div>
    );
  }
}

TelescopeImageViewer.defaultProps = {
  clipped: false,
};

TelescopeImageViewer.propTypes = {
  clipped: PropTypes.bool,
};

export default TelescopeImageViewer;
