import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import generateSseImageLoader from '../../../utils/generate-sse-image-source';
import { setImageDataToSnapshot, resetImageToSnap } from '../../../modules/Telescope-Overview';
import './video-image-loader.scss';

const SSE = 'SSE';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setImageDataToSnapshot,
    resetImageToSnap,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class VideoImageLoader extends Component {

  static propTypes = {
    teleStreamCode: PropTypes.string.isRequired,
    teleStreamURL: PropTypes.string.isRequired,
    teleStreamThumbnailVideoWidth: PropTypes.string.isRequired,
    teleStreamThumbnailVideoHeight: PropTypes.string.isRequired,
    teleStreamThumbnailQuality: PropTypes.string.isRequired,
    teleSystem: PropTypes.string.isRequired,
    telePort: PropTypes.number.isRequired,
    cameraSourceType: PropTypes.string.isRequired,
    clipped: PropTypes.bool,
    actions: PropTypes.shape({
      setImageDataToSnapshot: PropTypes.func.isRequired,
      resetImageToSnap: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    clipped: false,
  };

  componentDidMount() {
    const { teleSystem, telePort, cameraSourceType } = this.props;
    this.props.actions.resetImageToSnap();
    if (cameraSourceType === SSE && teleSystem && telePort) {
      const eventSourceURL = generateSseImageLoader(teleSystem, telePort);
      this.sseSource = new EventSource(eventSourceURL);
      this.sseSource.addEventListener('message', event => this.handleEventSource(event.data), false);
    }
  }

  componentWillUnmount() {
    if (this.sseSource) {
      this.sseSource.close();
      this.sseSource.removeEventListener('message', this.handleEventSource);
    }
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
    return `https://www.youtube.com/embed/${teleStreamCode}?autoplay=1&modestbranding=1&controls=0&showinfo=0&origin=http://live.slooh.com/`;
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
          src={this.generateIFrameUrl()}
          frameBorder="0"
        />
      </div>
    );
  }
}

export default VideoImageLoader;
