import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import generateSseImageLoader from '../../../utils/generate-sse-image-source';
import {
  updateActiveSSE,
  resetActiveSSE,
} from '../../../modules/telescope-details/actions';
import {
  setImageDataToSnapshot,
  resetImageToSnap,
} from '../../../modules/starshare-camera/starshare-camera-actions';
import styles from './ShowVideoImageLoader.style';
import YoutubePlayer from '../YoutubePlayer/YoutubePlayer';

const SSE = 'SSE';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setImageDataToSnapshot,
      resetImageToSnap,
      updateActiveSSE,
      resetActiveSSE,
    },
    dispatch
  ),
});

@connect(
  null,
  mapDispatchToProps
)
class ShowVideoImageLoader extends Component {
  static propTypes = {
    teleStreamCode: PropTypes.string.isRequired,
    teleStreamURL: PropTypes.string.isRequired,
    teleStreamThumbnailVideoWidth: PropTypes.string,
    teleStreamThumbnailVideoHeight: PropTypes.string,
    teleStreamThumbnailQuality: PropTypes.string.isRequired,
    teleSystem: PropTypes.string,
    telePort: PropTypes.number,
    cameraSourceType: PropTypes.string,
    clipped: PropTypes.bool,
    actions: PropTypes.shape({
      setImageDataToSnapshot: PropTypes.func.isRequired,
      resetImageToSnap: PropTypes.func.isRequired,
    }).isRequired,
    showVideoControls: PropTypes.number,
    showInfo: PropTypes.number,
    callSource: PropTypes.string,
    autoplay: PropTypes.number,
  };

  static defaultProps = {
    clipped: false,
    showVideoControls: 0,
    showInfo: 0,
    callSource: 'details',
    autoplay: 1,
  };

  componentDidMount() {
    const { teleSystem, telePort, cameraSourceType } = this.props;
    this.props.actions.resetActiveSSE();
    this.props.actions.resetImageToSnap();
    if (cameraSourceType === SSE && teleSystem && telePort) {
      const eventSourceURL = generateSseImageLoader(teleSystem, telePort);
      this.sseSource = new EventSource(eventSourceURL);
      this.sseSource.addEventListener(
        'message',
        event => this.handleEventSource(event.data),
        false
      );
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

    const { callSource } = this.props;

    if (messageType !== 'HEARTBEAT') {
      // assign the image URL to the image data for processing later
      this.props.actions.setImageDataToSnapshot({
        imageURL: currentImgURL,
        imageID,
        scheduledMissionID,
        astroObjectID,
        callSource,
      });
      this.props.actions.updateActiveSSE({
        astroObjectID,
      });
    }
  }

  generateIFrameUrl() {
    const {
      teleStreamCode,
      showVideoControls,
      showInfo,
      autoplay,
    } = this.props;
    return `https://www.youtube.com/embed/${teleStreamCode}?rel=0&amp;autoplay=${autoplay}&modestbranding=1&controls=${showVideoControls}&showinfo=${showInfo}&vq=hd720&origin=http://live.slooh.com/`;
  }

  render() {
    const {
      teleStreamCode,
      teleStreamThumbnailVideoWidth,
      teleStreamThumbnailVideoHeight,
      clipped,
    } = this.props;

    const videoImageLoaderClassnames = classnames(
      'video-image-loader video-container',
      {
        clipped,
      }
    );

    return (
      <div className={videoImageLoaderClassnames}>
        {/* <iframe
          id={teleStreamCode}
          className="video-iframe"
          type="text/html"
          width={teleStreamThumbnailVideoWidth}
          height={teleStreamThumbnailVideoHeight}
          src={this.generateIFrameUrl()}
          frameBorder="0"
          allow="autoplay;"
        /> */}
        <YoutubePlayer
          width={teleStreamThumbnailVideoWidth}
          height={teleStreamThumbnailVideoHeight}
          teleStreamCode={teleStreamCode}
          id={teleStreamCode}
          showVideoControls={1}
          autoplay={1}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default ShowVideoImageLoader;
