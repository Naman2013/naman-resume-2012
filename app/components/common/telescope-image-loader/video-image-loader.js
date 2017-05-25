import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import generateSseImageLoader from '../../../utils/generate-sse-image-source';
import { setImageDataToSnapshot } from '../../../modules/Telescope-Overview';
import './video-image-loader.scss';

const SSE = 'SSE';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setImageDataToSnapshot,
  }, dispatch),
});

@connect(mapDispatchToProps)
class VideoImageLoader extends Component {

  componentDidMount() {
    const { teleSystem, telePort, cameraSourceType } = this.props;
    if (cameraSourceType === SSE && teleSystem && telePort) {
      const eventSourceURL = generateSseImageLoader(teleSystem, telePort);
      this.sseSource = new EventSource(eventSourceURL);
      this.sseSource.addEventListener('message', event => this.handleEventSource(event.data), false);
    }
  }

  componentWillUnmount() {
    this.sseSource.close();
    this.sseSource.removeEventListener('message', this.handleEventSource);
  }

  handleEventSource(imageData) {
    const {
      astroObjectID,
      currentImgURL,
      imageID,
      messageType,
      scheduledMissionID,
    } = JSON.parse(imageData);

    if (messageType !== 'HEARTBEAT') {
      // assign the image URL to the image data for processing later
      this.props.actions.setImageDataToSnapshot({
        imageURL: currentImgURL,
        imageID,
        scheduledMissionID,
        astroObjectID,
      });
    }
  }

  generateIFrameUrl() {
    const { teleStreamCode } = this.props;
    return `https://www.youtube.com/embed/${teleStreamCode}?autoplay=1&origin=http://live.slooh.com/`;
  }

  render() {
    const {
      teleStreamCode,
      teleStreamThumbnailVideoWidth,
      teleStreamThumbnailVideoHeight,
      teleStreamThumbnailQuality,
      clipped,
    } = this.props;

    const videoImageLoaderClassnames = classnames('video-image-loader', {
      clipped,
    });

    return (
      <div className={videoImageLoaderClassnames}>
        <iframe
          id={teleStreamCode}
          className="video-iframe"
          type="text/html"
          width={teleStreamThumbnailVideoWidth}
          height={teleStreamThumbnailVideoHeight}
          controls="0"
          src={this.generateIFrameUrl()}
          frameBorder="0"
        />
      </div>
    );
  }
}

VideoImageLoader.defaultProps = {
  clipped: false,
};

VideoImageLoader.propTypes = {
  teleStreamCode: PropTypes.string.isRequired,
  teleStreamURL: PropTypes.string.isRequired,
  teleStreamThumbnailVideoWidth: PropTypes.string.isRequired,
  teleStreamThumbnailVideoHeight: PropTypes.string.isRequired,
  teleStreamThumbnailQuality: PropTypes.string.isRequired,
  teleSystem: PropTypes.string.isRequired,
  telePort: PropTypes.string.isRequired,
  cameraSourceType: PropTypes.string.isRequired,
  clipped: PropTypes.bool,
  actions: PropTypes.shape({
    setImageDataToSnapshot: PropTypes.func.isRequired,
  }).isRequired,
};

export default VideoImageLoader;
