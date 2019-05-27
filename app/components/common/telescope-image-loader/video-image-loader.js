import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StarShareCamera from 'app/components/telescope-details/star-share-camera/star-share-camera';
import generateSseImageLoader from '../../../utils/generate-sse-image-source';
import {
  updateActiveSSE,
  resetActiveSSE,
} from '../../../modules/telescope-details/actions';
import {
  setImageDataToSnapshot,
  resetImageToSnap,
} from '../../../modules/starshare-camera/starshare-camera-actions';
import './video-image-loader.scss';
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

const mapStateToProps = ({ starshareCamera }) => ({
  snapshotList: starshareCamera.snapshotList,
  snapshotMsg: starshareCamera.snapshotMsg,
  snapAPIError: starshareCamera.apiError,
  imagesLastSnapped: starshareCamera.imagesLastSnapped,
  justSnapped: starshareCamera.justSnapped,
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class VideoImageLoader extends Component {
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
    autoPlay: PropTypes.number,
    showOverlay: PropTypes.bool,
  };

  static defaultProps = {
    clipped: false,
    showVideoControls: 0,
    showOverlay: true,
    showInfo: 0,
    autoPlay: 1,
    callSource: 'details',
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
      autoPlay,
      teleStreamCode,
      showVideoControls,
      showInfo,
    } = this.props;
    return `https://www.youtube.com/embed/${teleStreamCode}?rel=0&amp;autoplay=${autoPlay}&modestbranding=1&controls=${showVideoControls}&showinfo=${showInfo}&vq=hd720&origin=http://live.slooh.com/`;
  }

  render() {
    const {
      actions,
      snapshotMsg,
      justSnapped,
      snapAPIError,
      snapshotList,
      imagesLastSnapped,
    } = this.props;
    return (
      <div>
        <YoutubePlayer {...this.props} />
        <StarShareCamera
          actions={actions}
          snapshotMsg={snapshotMsg}
          justSnapped={justSnapped}
          snapAPIError={snapAPIError}
          snapshotList={snapshotList}
          imagesLastSnapped={imagesLastSnapped}
        />
      </div>
    );
  }
}

export default VideoImageLoader;
