import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './thumbnail-image-loader.scss';

class ThumbnailImageLoader extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      currentImageUrl: null,
      previousImageUrl: null,
      schedMissionId: null,
      msnStartTime: null,
      lastImgTime: null,
      serverTime: null,
      firstLoad: true,
      adjustedFade: 0, // duration of fade in of new image
      startingOpacity: null, // starting opacity of the new image
    };
  }

  generateThumbnailUrl(imageUrl) {
    if(!imageUrl) {
      return;
    }

    const { teleThumbWidth } = this.props;
    return `/util/thumbnail.php?url=${imageUrl}&dimension=W&size=${teleThumbWidth}`;
  }

  handleSourceImage(imageData) {
    const [
      currentImageUrl,
      previousImageUrl,
      schedMissionId,
      msnStartTime,
      lastImgTime,
      serverTime ] = imageData.split('|');

    const { teleFade } = this.props; // expected fade may change based on how much time passed
    const { firstLoad } = this.state;
    const progress = Math.floor(Date.now() / 1000) - lastImgTime;

    let adjustedFade = teleFade;
    let startingOpacity = 0;

    /*
      on first load of these images, we calculate how much
      time has passed and apply some modification to the initial
      opacity and timing values to make up for lost time and sync
      the rest of the experience together
    */
    if(firstLoad) {
      if(progress >= teleFade) {
        adjustedFade = 0;
        startingOpacity = 1;
      } else {
        adjustedFade = teleFade - progress;
        startingOpacity = Math.round((progress / teleFade) * 100) / 100;
      }
    }

    this.setState({
      currentImageUrl,
      previousImageUrl,
      schedMissionId,
      msnStartTime,
      lastImgTime,
      serverTime,
      adjustedFade,
      startingOpacity,
      firstLoad: false,
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

  generateImageId() {
    return `tele-id-${this.props.teleId}`;
  }

  componentDidUpdate() {
    const {
      currentImageUrl,
      previousImageUrl,
      startingOpacity,
      adjustedFade } = this.state;

    if(!currentImageUrl || !previousImageUrl) {
      return;
    }

    // we start this work when we are certain we have images to work on
    const topImageAddress = this.generateThumbnailUrl(currentImageUrl);
    const topImage = document.getElementById(this.generateImageId());

    topImage.style.transition = 'opacity';
    topImage.style.opacity = startingOpacity;
    topImage.src = topImageAddress;
    window.getComputedStyle(topImage, null).opacity;
    topImage.style.transition = `opacity ${adjustedFade}s`;
    topImage.style.opacity = '1';
  }

  render() {
    const {
      currentImageUrl,
      previousImageUrl,
      transitionDuration } = this.state;

    const { clipped } = this.props;

    if(!currentImageUrl || !previousImageUrl) {
      return null;
    }

    const bottomImageAddress = this.generateThumbnailUrl(previousImageUrl);
    const containerClasses = classnames({
      'sse-thumbnails': 1,
      'clipped': clipped,
    });

    return(
      <div className={containerClasses}>
        <div className="bottom-image">
          <img
            width={this.props.teleThumbWidth}
            src={bottomImageAddress} />
        </div>

        <div className="top-image">
          <img
            width={this.props.teleThumbWidth}
            id={this.generateImageId()} />
        </div>
      </div>
    );
  }
}

ThumbnailImageLoader.defaultProps = {
  clipped: true,
};

ThumbnailImageLoader.propTypes = {
  imageSource: PropTypes.string,
  teleId: PropTypes.string,
  teleThumbWidth: PropTypes.string,
  teleFade: PropTypes.string,
  clip: PropTypes.bool,
};

export default ThumbnailImageLoader;
