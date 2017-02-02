import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { updateTelescopeActiveMission } from '../../../modules/active-telescope-missions/active-telescope-missions-actions';
import styles from './telescope-image-loader.scss';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    updateTelescopeActiveMission,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class TelescopeImageLoader extends Component {
  constructor(props) {
    super(props);

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

    // storing a reference to the source rendered to determine if it changes later
    // this will flush the current sse for the instance, and rebind to a new source
    this.previouslyRenderedImageSource = this.props.imageSource;
  }

  generateThumbnailUrl(imageUrl) {
    const { teleThumbWidth, loadThumbnails } = this.props;
    if (loadThumbnails) {
      return `/util/thumbnail.php?url=${imageUrl}&dimension=W&size=${teleThumbWidth}`;
    } else {
      return imageUrl;
    }
  }

  handleSourceImage(imageData) {
    const [
      currentImageUrl,
      previousImageUrl,
      schedMissionId,
      msnStartTime,
      lastImgTime,
      serverTime ] = imageData.split('|');

    /*
      NOTE: checking if the first index is the string heartbeat
      as to avoid loading malformed messages...

      NOTE: along with setting up the image, we are firing actions associated
      with the telescope mission
    */
    if(currentImageUrl != 'heartbeat') {
      const { teleFade, obsId, teleId, domeId, actions, missionFormat } = this.props; // expected fade may change based on how much time passed

      // TODO: this may be problematic...
      // lets think of how we can detangle this mission info request
      // from the image loader component ( even through SSE events provide the message content )
      actions.updateTelescopeActiveMission({
        obsId,
        domeId,
        format: missionFormat,
        telescopeId: teleId,
      });

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
  }

  componentWillMount() {
    this.attachSSE(this.props.imageSource);
  }

  componentWillUnmount() {
    this.detachSSE();
  }

  attachSSE(imageSource) {
    this.sseSource = new EventSource( this.props.imageSource );
    this.sseSource.addEventListener(
      'message',
      event => this.handleSourceImage( event.data ), false );
  }

  detachSSE() {
    this.sseSource.close();
    this.sseSource.removeEventListener('message', this.handleSourceImage, false);
  }

  rebuildSSE(newImageSource) {
    this.detachSSE();
    this.attachSSE(newImageSource);
    this.previouslyRenderedImageSource = newImageSource;
  }

  generateImageId() {
    return `tele-id-${this.props.teleId}`;
  }

  componentDidUpdate() {

    if(this.props.imageSource !== this.previouslyRenderedImageSource) {
      this.rebuildSSE(this.props.imageSource);
      return;
    }

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

    const { teleThumbWidth } = this.props;

    if(!currentImageUrl || !previousImageUrl) {
      return null;
    }

    const bottomImageAddress = this.generateThumbnailUrl(previousImageUrl);

    return(
      <div className="sse-thumbnails">
        <div className="bottom-image">
          <img
            width={teleThumbWidth}
            src={bottomImageAddress}
          />

          <div className="top-image">
            <img
              width={teleThumbWidth}
              id={this.generateImageId()}
            />
          </div>
        </div>
      </div>
    );
  }
}

TelescopeImageLoader.defaultProps = {
  loadThumbnails: false,
};

TelescopeImageLoader.propTypes = {
  imageSource: PropTypes.string,
  teleId: PropTypes.string,
  obsId: PropTypes.string,
  domeId: PropTypes.string,
  teleThumbWidth: PropTypes.string,
  teleFade: PropTypes.string,
  loadThumbnails: PropTypes.bool,
  missionFormat: PropTypes.string.isRequired,
};

export default TelescopeImageLoader;
