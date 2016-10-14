import React, { Component, PropTypes } from 'react';
import style from './video-image-loader.scss';

class VideoImageLoader extends Component {

  generateIFrameUrl() {
    const {teleStreamCode} = this.props;
    return `https://www.youtube.com/embed/${teleStreamCode}?autoplay=1&origin=http://live.slooh.com/`;
  }

  render() {
    const {
      teleStreamCode,
      teleStreamThumbnailVideoWidth,
      teleStreamThumbnailVideoHeight,
      teleStreamThumbnailQuality
    } = this.props;

    return(
      <div className="video-image-loader">
        <iframe
          id={teleStreamCode}
          type="text/html"
          width={teleStreamThumbnailVideoWidth}
          height={teleStreamThumbnailVideoHeight}
          src={this.generateIFrameUrl()}
          frameborder="0">
        </iframe>
      </div>
    );
  }
}

VideoImageLoader.propTypes = {
  teleStreamCode: PropTypes.string,
  teleStreamURL: PropTypes.string,
  teleStreamThumbnailVideoWidth: PropTypes.string,
  teleStreamThumbnailVideoHeight: PropTypes.string,
  teleStreamThumbnailQuality: PropTypes.string,
};

export default VideoImageLoader;
