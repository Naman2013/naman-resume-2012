import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import generateSseImageLoader from '../../../utils/generate-sse-image-source';
import style from './video-image-loader.scss';

class VideoImageLoader extends Component {

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
  teleAccessMethod: PropTypes.string.isRequired,
  clipped: PropTypes.bool,
};

export default VideoImageLoader;
