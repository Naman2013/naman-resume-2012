import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTelescopeActiveMission, setActiveTelescopeMissionID } from '../../../modules/active-telescope-missions/active-telescope-missions-actions';
import { setImageDataToSnapshot } from '../../../modules/starshare-camera/starshare-camera-actions';
import './telescope-image-loader.scss';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateTelescopeActiveMission,
    setImageDataToSnapshot,
    setActiveTelescopeMissionID,
  }, dispatch),
});

// ugh... this is to determine when to make calls to the various content APIs
const mapStateToProps = ({ activeTelescopeMissions }) => ({
  activeTelescopeMissionID: activeTelescopeMissions.activeTelescopeMissionID,
});

@connect(mapStateToProps, mapDispatchToProps)
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

  componentWillMount() {
    this.attachSSE(this.props.imageSource);
  }

  componentWillUnmount() {
    this.detachSSE();
  }

  handleSourceImage(imageData) {
    const {
      astroObjectID,
      currentImgURL,
      previousImgURL,
      imageID,
      lastImageTime,
      messageText,
      messageType,
      msnStartTime,
      scheduledMissionID,
      serverTime,
      statusCode,
    } = JSON.parse(imageData);

    /*
      NOTE: checking if the first index is the string heartbeat
      as to avoid loading malformed messages...

      NOTE: along with setting up the image, we are firing actions associated
      with the telescope mission
    */
    if (messageType !== 'HEARTBEAT') {
      const {
        teleFade,
        obsId,
        teleId,
        domeId,
        actions,
        missionFormat,
        activeTelescopeMissionID,
      } = this.props;

      if (missionFormat === 'compact') {
        actions.updateTelescopeActiveMission({
          obsId,
          domeId,
          format: missionFormat,
          telescopeId: teleId,
          scheduledMissionId: scheduledMissionID,
        });
      }

      /**
        - scheduledMissionID comes from SSE
        - activeTelescopeMissionID is a stored reference to the scheduledMissionID
          that had been previously handled
        */
      if (missionFormat === 'full') {
        if (scheduledMissionID !== activeTelescopeMissionID) {
          actions.setActiveTelescopeMissionID(scheduledMissionID);
          actions.updateTelescopeActiveMission({
            obsId,
            domeId,
            format: missionFormat,
            telescopeId: teleId,
            scheduledMissionId: scheduledMissionID,
          });
        }
      }

      const { firstLoad } = this.state;
      const progress = Math.floor(Date.now() / 1000) - lastImageTime;

      let adjustedFade = teleFade;
      let startingOpacity = 0;

      /*
        on first load of these images, we calculate how much
        time has passed and apply some modification to the initial
        opacity and timing values to make up for lost time and sync
        the rest of the experience together
      */
      if (firstLoad) {
        if (progress >= teleFade) {
          adjustedFade = 0;
          startingOpacity = 1;
        } else {
          adjustedFade = teleFade - progress;
          startingOpacity = Math.round((progress / teleFade) * 100) / 100;
        }
      }

      // assign the image URL to the image data for processing later
      this.props.actions.setImageDataToSnapshot({
        imageURL: currentImgURL,
        imageID,
        scheduledMissionID,
        astroObjectID,
      });

      this.setState({
        currentImageUrl: currentImgURL,
        previousImageUrl: previousImgURL,
        schedMissionId: scheduledMissionID,
        msnStartTime,
        lastImgTime: lastImageTime,
        serverTime,
        adjustedFade,
        startingOpacity,
        astroObjectID,
        imageID,
        messageText,
        statusCode,
        firstLoad: false,
      });
    }
  }

  generateThumbnailUrl(imageUrl) {
    const { teleThumbWidth, loadThumbnails } = this.props;
    if (loadThumbnails) {
      return `/util/thumbnail.php?url=${imageUrl}&dimension=W&size=${teleThumbWidth}`;
    }
    return imageUrl;
  }

  componentDidUpdate() {
    if (this.props.imageSource !== this.previouslyRenderedImageSource) {
      this.rebuildSSE(this.props.imageSource);
      return;
    }

    const {
      currentImageUrl,
      previousImageUrl,
      startingOpacity,
      adjustedFade } = this.state;

    if (!currentImageUrl || !previousImageUrl) {
      return;
    }

    // we start this work when we are certain we have images to work on
    const topImageAddress = this.generateThumbnailUrl(currentImageUrl);
    const topImage = document.getElementById(this.generateImageId());

    if (topImage) {
      topImage.style.transition = 'opacity';
      topImage.style.opacity = startingOpacity;
      topImage.src = topImageAddress;
      window.getComputedStyle(topImage, null).opacity;
      topImage.style.transition = `opacity ${adjustedFade}s`;
      topImage.style.opacity = '1';
    }
  }

  attachSSE(imageSource) {
    this.sseSource = new EventSource(imageSource);
    this.sseSource.addEventListener(
      'message',
      event => this.handleSourceImage(event.data), false);
  }

  detachSSE() {
    this.sseSource.removeEventListener('message', this.handleSourceImage, false);
    this.sseSource.close();
  }

  rebuildSSE(newImageSource) {
    this.detachSSE();
    this.attachSSE(newImageSource);
    this.previouslyRenderedImageSource = newImageSource;
  }

  generateImageId() {
    return `tele-id-${this.props.teleId}`;
  }

  render() {
    const {
      currentImageUrl,
      previousImageUrl,
    } = this.state;

    const { teleThumbWidth } = this.props;

    if (!currentImageUrl || !previousImageUrl) {
      return null;
    }

    const bottomImageAddress = this.generateThumbnailUrl(previousImageUrl);

    return (
      <div className="sse-thumbnails">
        <div className="bottom-image">
          <img
            alt=""
            width={teleThumbWidth}
            src={bottomImageAddress}
          />

          <div className="top-image">
            <img
              alt=""
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
  missionFormat: null,
};

TelescopeImageLoader.propTypes = {
  imageSource: PropTypes.string,
  teleId: PropTypes.string,
  obsId: PropTypes.string,
  domeId: PropTypes.string,
  teleThumbWidth: PropTypes.string,
  teleFade: PropTypes.number,
  loadThumbnails: PropTypes.bool,
  missionFormat: PropTypes.string,
};

export default TelescopeImageLoader;
