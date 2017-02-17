import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
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
  teleStreamCode: PropTypes.string,
  teleStreamURL: PropTypes.string,
  teleStreamThumbnailVideoWidth: PropTypes.string,
  teleStreamThumbnailVideoHeight: PropTypes.string,
  teleStreamThumbnailQuality: PropTypes.string,
  clipped: PropTypes.bool,
};

export default VideoImageLoader;
