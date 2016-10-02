import React, { Component, PropTypes } from 'react';
import styles from './thumbnail-image-loader.scss';

const { string } = PropTypes;
const STATIC_PROGRESS = 70;

class ThumbnailImageLoader extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      bottomImageUrl: null,
      topImageUrl: null,
      lastImageTime: null,
      startTime: null,
      firstLoad: true,
      transitionDuration: null,
      imageOpacity: null,
    };
  }

  static generateThumbnailUrl(imageUrl) {
    if(!imageUrl) {
      return;
    }

    const imageWidth = '250';
    return `/util/thumbnail.php?url=${imageUrl}&dimension=W&size=${imageWidth}`;
  }

  handleSourceImage( imageData ) {
    let [ bottomImageUrl, topImageUrl, startTime, lastImageTime ] = imageData.split('|');
    let transitionDuration = '0';
    let imageOpacity = '1';
    lastImageTime = Number(lastImageTime) || 0;

    const firstLoad = false;
    const progress = Math.floor(Date.now() / 1000) - lastImageTime;

    if(this.state.firstLoad && progress <= STATIC_PROGRESS) {
      transitionDuration = (STATIC_PROGRESS - progress);
      imageOpacity = Math.round( (progress / STATIC_PROGRESS) * 100 ) / 100;
    } else {
      transitionDuration = '0';
      imageOpacity = '0';
    }

    this.setState({
      bottomImageUrl,
      topImageUrl,
      startTime,
      lastImageTime,
      transitionDuration,
      imageOpacity,
      firstLoad,
    });
  }

  componentWillMount() {
    this.sseSource = new EventSource( this.props.imageSource );
    this.sseSource.addEventListener(
      'message',
      event => this.handleSourceImage( event.data ), false );
  }

  componentWillUnmount() {
    this.sseSource.close();
    this.sseSource.removeEventListener('message', this.handleSourceImage, false);
  }

  componentDidUpdate() {
    const topImageAddress = ThumbnailImageLoader.generateThumbnailUrl(this.state.topImageUrl);
    const topImage = document.getElementById('top-image');
    topImage.style.transition = 'opacity';
    topImage.style.opacity = '0';
    topImage.src = topImageAddress;
    window.getComputedStyle(topImage, null).opacity;
    topImage.style.transition = `opacity ${STATIC_PROGRESS}s`;
    topImage.style.opacity = '1';
  }

  render() {
    const {
      bottomImageUrl,
      topImageUrl,
      transitionDuration,
      imageOpacity } = this.state;

    if(!bottomImageUrl || !topImageUrl) {
      return null;
    }

    const bottomImageAddress = ThumbnailImageLoader.generateThumbnailUrl(bottomImageUrl);
    const topImageAddress = ThumbnailImageLoader.generateThumbnailUrl(topImageUrl);

    return(
      <div className="sse-thumbnails">
        <div className="bottom-image">
          <img
            width="250"
            src={topImageAddress} />
        </div>

        <div className="top-image">
          <img
            width="250"
            id="top-image" />
        </div>
      </div>
    );
  }
}

ThumbnailImageLoader.propTypes = {
  imageSource: string,
};

export default ThumbnailImageLoader;
