import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { noop } from 'lodash';
import TelescopeThumbnailView from '../../TelescopeThumbnailView';
import {
  updateTelescopeActiveMission,
  setActiveTelescopeMissionID,
} from '../../../modules/active-telescope-missions/active-telescope-missions-actions';
import { setImageDataToSnapshot } from '../../../modules/starshare-camera/starshare-camera-actions';
import {
  updateActiveSSE,
  resetActiveSSE,
} from '../../../modules/telescope-details/actions';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      updateTelescopeActiveMission,
      setImageDataToSnapshot,
      setActiveTelescopeMissionID,
      updateActiveSSE,
      resetActiveSSE,
    },
    dispatch
  ),
});

const mapStateToProps = ({ activeTelescopeMissions }) => ({
  activeTelescopeMissionID: activeTelescopeMissions.activeTelescopeMissionID,
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class TelescopeImageLoader extends Component {
  static propTypes = {
    imageSource: PropTypes.string.isRequired,
    teleId: PropTypes.string.isRequired,
    obsId: PropTypes.string.isRequired,
    domeId: PropTypes.string.isRequired,
    teleFade: PropTypes.number.isRequired,
    loadThumbnails: PropTypes.bool,
    missionFormat: PropTypes.string,
    viewportHeight: PropTypes.number,
    shouldUseTransitions: PropTypes.bool,
    actions: PropTypes.shape({
      resetActiveSSE: PropTypes.func.isRequired,
    }).isRequired,
    onImageChange: PropTypes.func,
  };

  static defaultProps = {
    loadThumbnails: false,
    missionFormat: null,
    viewportHeight: 0,
    shouldUseTransitions: true,
    onImageChange: noop,
  };

  constructor(props) {
    super(props);
    this.previouslyRenderedImageSource = this.props.imageSource;
    this.imageRef = React.createRef();
  }

  state = {
    currentImageUrl: null,
    currW: 0,
    currH: 0,
    previousImageUrl: null,
    prevW: 0,
    prevH: 0,
    firstLoad: true,
    adjustedFade: 0, // duration of fade in of new image
    startingOpacity: null, // starting opacity of the new image
    loading: true,
    receivedNewImage: true,
    newMission: true,
  };

  componentWillMount() {
    this.attachSSE(this.props.imageSource);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.unmountHandler);
  }

  componentDidUpdate() {
    const { receivedNewImage } = this.state;

    if (this.props.imageSource !== this.previouslyRenderedImageSource) {
      this.props.actions.resetActiveSSE();
      this.setState({ loading: true, firstLoad: true });
      this.rebuildSSE(this.props.imageSource);
      return;
    }

    const { loadThumbnails, missionTitle, removeFadeTransitions } = this.props;

    const {
      currentImageUrl,
      currW,
      currH,
      previousImageUrl,
      prevW,
      prevH,
      startingOpacity,
      adjustedFade,
    } = this.state;

    if (!currentImageUrl || !previousImageUrl) {
      return;
    }

    // TODO: continue to refactor this piece of work out of the loader and into
    // specialized image viewer like the thumbnail image viewer
    // for now, returning early when using thumbnails to prevent this work from happening
    // since this has been represented for the thumbnail image viewer already
    // we start this work when we are certain we have images to work on
    if (loadThumbnails) {
      return;
    }

    if (receivedNewImage) {
      const topImage = window.document.getElementById(this.generateImageId());
      if (topImage && !removeFadeTransitions) {
        topImage.style.transition = 'opacity';
        topImage.style.opacity = startingOpacity;
        topImage.src = currentImageUrl;
        window.getComputedStyle(topImage, null).opacity;
        topImage.style.transition = `opacity ${adjustedFade}s`;
        topImage.style.opacity = '1';
      }

      this.props.onImageChange({
        imageWidth: this.imageRef.current.offsetWidth,
        imageHeight: this.imageRef.current.offsetHeight,
        missionTitle,
      });

      this.setState({ receivedNewImage: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.unmountHandler);
    this.detachSSE();
  }

  unmountHandler = () => {
    this.props.actions.resetActiveSSE();
    this.detachSSE();
  };

  handleSourceImage(imageData) {
    const {
      astroObjectID,
      currentImgURL,
      currW,
      currH,
      previousImgURL,
      prevW,
      prevH,
      imageID,
      lastImageTime,
      messageText,
      messageType,
      msnStartTime,
      scheduledMissionID,
      serverTime,
      statusCode,
    } = JSON.parse(imageData);

    /**
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
          actions.updateActiveSSE({
            astroObjectID,
          });
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
      const { shouldUseTransitions } = this.props;
      if (firstLoad && shouldUseTransitions) {
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
        currW,
        currH,
        previousImageUrl: previousImgURL,
        prevW,
        prevH,
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
        loading: false,
        receivedNewImage: true,
        newMission: scheduledMissionID !== activeTelescopeMissionID,
      });
    }
  }

  attachSSE(imageSource) {
    this.sseSource = new EventSource(imageSource);
    this.sseSource.addEventListener(
      'message',
      event => this.handleSourceImage(event.data),
      false
    );
  }

  detachSSE() {
    this.sseSource.removeEventListener(
      'message',
      this.handleSourceImage,
      false
    );
    this.sseSource.close();
  }

  rebuildSSE(newImageSource) {
    this.detachSSE();
    this.attachSSE(newImageSource);
    this.previouslyRenderedImageSource = newImageSource;
  }

  generateImageId() {
    const { teleId, fullscreenMode } = this.props;
    return `tele-id-${teleId}${fullscreenMode ? 'fullscreen' : ''}`;
  }

  render() {
    const {
      currentImageUrl,
      currW,
      currH,
      previousImageUrl,
      prevW,
      prevH,
      startingOpacity,
      adjustedFade,
      newMission,
    } = this.state;

    const { loadThumbnails, viewportHeight } = this.props;

    // if (!currentImageUrl || !previousImageUrl) {
    //   return null;
    // }


    const isPreviousImageSquare = prevW == prevH;
    const isCurrentImageSquare = currW == currH;

  

    if (loadThumbnails) {
      return (
        <TelescopeThumbnailView
          topImageURL={currentImageUrl}
          bottomImageURL={previousImageUrl}
          startingOpacity={startingOpacity}
          fadeDuration={adjustedFade}
        />
      );
    }

  

    const imageStyle = {
      minHeight: viewportHeight,
      maxHeight: viewportHeight,
      height: viewportHeight,
      objectFit: 'cover',
    };

    const topImageStyle = {
      backgroundColor: newMission ? '#000' : 'transparent',
    };

    return (
      <div className="sse-thumbnails">
        <div className="bottom-image">
          <img
            alt=""
            width="100%"
            src={previousImageUrl}
            draggable="false"
            style={imageStyle}
          />

          <div className="top-image" style={topImageStyle}>
            <img
              style={imageStyle}
              alt=""
              src={currentImageUrl}
              height={viewportHeight}
              id={this.generateImageId()}
              draggable="false"
              ref={this.imageRef}
            />
          </div>
        </div>

        <style jsx>
          {`
            .sse-thumbnails {
              position: relative;
            }

            .bottom-image {
              position: relative;
              height: ${viewportHeight}px;
              position: relative;
              background: #000;
            }

            .bottom-image img {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              margin: auto;
              max-height: ${viewportHeight}px;
              max-width: 100%;
            }

            .top-image {
              transition: opacity ease-in-out;
              width: 100%;
              height: 100%;
              position: relative;
            }
          `}
        </style>
      </div>
    );
  }
}

export default TelescopeImageLoader;
