import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from 'lodash/noop';
import last from 'lodash/last';

import { setImageDataToSnapshot } from '../../../modules/starshare-camera/starshare-camera-actions';
import {
  removeImageViewerClipState,
  applyImageViewerClipState,
} from '../../../modules/telescope-details/actions';

import LiveImageViewer from './';
import VirtualTelescopeViewer from '../../VirtualTelescopeViewer';
import TelescopeImageLoader from '../../common/telescope-image-loader';
import obsIdTeleIdDomeIdFromTeleId from '../../../utils/obsid-teleid-domeid-from-teleid';
import generateSseImageLoader from '../../../utils/generate-sse-image-source';
import Transition from './Transition';

const MIN_VIEWER_HEIGHT = '500';

const propTypes = {
  applyImageViewerClipState: PropTypes.func.isRequired,
  removeImageViewerClipState: PropTypes.func.isRequired,
  isImageViewerClipped: PropTypes.bool,
  timestamp: PropTypes.number,
  missionStart: PropTypes.number,
  missionEnd: PropTypes.number,
  coordinateArray: PropTypes.arrayOf(PropTypes.string),
  missionData: PropTypes.arrayOf(PropTypes.string),
  showMissionData: PropTypes.bool.isRequired,
  objectTitleShort: PropTypes.string,
  processing: PropTypes.string,
  schedulingMember: PropTypes.string,
  callSource: PropTypes.string,
  actions: PropTypes.shape({
    setImageDataToSnapshot: PropTypes.func.isRequired,
    applyImageViewerClipState: PropTypes.func.isRequired,
    removeImageViewerClipState: PropTypes.func.isRequired,
  }),
  currentMission: PropTypes.shape({
    scheduledMissionId: PropTypes.number,
  }),
  routerState: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  // TODO: complete the validation
  // imageSource: PropTypes.
  // teleThumbWidth: PropTypes.
  // teleFade: PropTypes.
  // clipped: PropTypes.
  // missionFormat: PropTypes.
  // teleId: PropTypes.
};

const defaultProps = {
  isImageViewerClipped: true,
  timestamp: 0,
  missionStart: 0,
  missionEnd: 0,
  coordinateArray: [],
  missionData: [],
  objectTitleShort: '',
  processing: '',
  schedulingMember: '',
  callSource: 'details',
  actions: {
    setImageDataToSnapshot: noop,
  },
  currentMission: {
    scheduledMissionId: 0,
  },
  routerState: {
    pathname: '',
  },
  // TODO: complete the validation
  // imageSource: PropTypes.
  // teleThumbWidth: PropTypes.
  // teleFade: PropTypes.
  // clipped: PropTypes.
  // missionFormat: PropTypes.
  // teleId: PropTypes.
};

const mapStateToProps = ({
  activeTelescopeMissions: { activeTelescopeMission },
  routing: { locationBeforeTransitions },
}) => ({
  routerState: locationBeforeTransitions,
  currentMission: activeTelescopeMission,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setImageDataToSnapshot,
      removeImageViewerClipState,
      applyImageViewerClipState,
    },
    dispatch,
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
class SSELiveImageViewer extends Component {
  constructor(props) {
    super(props);
    console.log('RUNNING CONSTRUCTOR...');
  }
  state = {
    viewerDimensions: { height: MIN_VIEWER_HEIGHT },
    transitionVideoOpacity: 0,

    missionCounter: 0,
    currentlyRenderingMissionID: this.props.currentMission.scheduledMissionId,
  };

  componentWillReceiveProps(nextProps) {
    const {
      currentMission: { scheduledMissionId },
      routerState: { pathname },
    } = nextProps;

    const { currentlyRenderingMissionID, missionCounter } = this.state;

    if (pathname !== this.props.routerState.pathname) {
      console.log('pathname change detected');
      this.setState({
        missionCounter: 0,
        currentlyRenderingMissionID: 0,
      });
    }

    if (pathname === this.props.routerState.pathname) {
      console.log(scheduledMissionId, currentlyRenderingMissionID);
      if (scheduledMissionId && (scheduledMissionId !== currentlyRenderingMissionID)) {
        const count = missionCounter + 1;
        console.log(count);
        this.setState(() => ({
          missionCounter: count,
          currentlyRenderingMissionID: scheduledMissionId,
          transitionVideoOpacity: (missionCounter > 1) ? 1 : 0,
        }));
      }
    }

    // const [, , , teleUniqueId] = pathname.split('/');
    // const { previouslyRenderedMissionID, activeTelescopeID } = this.state;
    // console.log('ACTIVE: teleUniqueId', teleUniqueId);
    // console.log('PREV: activeTelescopeID', activeTelescopeID);
    // console.log('NEW: scheduledMissionId', scheduledMissionId);
    // console.log('PREV: previouslyRenderedMissionID', previouslyRenderedMissionID);
    // console.log('==================================================');
    // if (activeTelescopeID === teleUniqueId) {
    //   if (scheduledMissionId) {
    //     if (previouslyRenderedMissionID) {
    //       if ((previouslyRenderedMissionID !== scheduledMissionId)) {
    //         this.setState({
    //           transitionVideoOpacity: 1,
    //           previouslyRenderedMissionID: scheduledMissionId,
    //         });
    //       }
    //     } else {
    //       this.setState({
    //         previouslyRenderedMissionID: scheduledMissionId,
    //       });
    //     }
    //   }
    // } else {
    //   this.setState(() => ({
    //     activeTelescopeID: teleUniqueId,
    //     previouslyRenderedMissionID: scheduledMissionId,
    //   }));
    // }
  }

  onClipChange = (clipState) => {
    if (clipState) {
      this.props.actions.applyImageViewerClipState();
    } else {
      this.props.actions.removeImageViewerClipState();
    }
  };

  handlePositionChange = ({ x, y }) => {
    this.props.actions.setImageDataToSnapshot({
      originX: x,
      originY: y,
    });
  };

  handleZoomUpdate = (scale) => {
    this.props.actions.setImageDataToSnapshot({
      zoom: scale,
    });
  };

  handleVideoTransitionEnd = () => {
    this.setState({
      transitionVideoOpacity: 0,
    });
  }

  contentResizeCallback = (viewerDimensions) => {
    // TODO: refactor to use render props instead of a callback in this fashion
    this.setState({
      viewerDimensions,
    });
  }

  render() {
    const {
      isImageViewerClipped,
      timestamp,
      missionStart,
      missionEnd,
      coordinateArray,
      missionData,
      showMissionData,
      objectTitleShort,
      processing,
      schedulingMember,

      telePort,
      teleSystem,
      teleId,
      teleFade,
      clipped,
      missionFormat,
      callSource,
    } = this.props;

    const { transitionVideoOpacity } = this.state;

    const { viewerDimensions: { height } } = this.state;

    const { obsId, domeId } = obsIdTeleIdDomeIdFromTeleId(teleId);
    const imageSource = generateSseImageLoader(teleSystem, telePort);
    const teleThumbWidth = '866px';
    const inlineTransitionCSS = {
      opacity: transitionVideoOpacity,
    };

    return (
      <div>
        <div
          className="mission-transition-container"
          style={inlineTransitionCSS}
        >
          <Transition
            height={height}
            minHeight={MIN_VIEWER_HEIGHT}
            handleOnEnded={this.handleVideoTransitionEnd}
          />
        </div>

        <LiveImageViewer
          clipped={isImageViewerClipped}
          onZoomChange={this.handleZoomUpdate}
          onClipChange={this.onClipChange}
        >
          <VirtualTelescopeViewer
            timestamp={timestamp}
            coordinateArray={coordinateArray}
            missionData={missionData}
            showMissionData={showMissionData}
            objectTitleShort={objectTitleShort}
            processing={processing}
            schedulingMember={schedulingMember}
            onPositionChange={this.handlePositionChange}
            now={timestamp}
            missionStart={missionStart}
            missionEnd={missionEnd}
            resizeEventCallback={this.contentResizeCallback}
          >
            <TelescopeImageLoader
              imageSource={imageSource}
              teleId={teleId}
              obsId={obsId}
              domeId={domeId}
              teleThumbWidth={teleThumbWidth}
              teleFade={teleFade}
              clipped={clipped}
              missionFormat={missionFormat}
            />
          </VirtualTelescopeViewer>
        </LiveImageViewer>

        <style jsx>{`
          .mission-transition-container {
            z-index: 99999;
            position: relative;
            pointer-events: none;
            -webkit-transition: 'opacity 0.25s ease-in';
            -moz-transition: 'opacity 0.25s ease-in';
            -o-transition: 'opactiy 0.25s ease-in';
            transition: 'opacity 0.25s ease-in';
          }
        `}</style>
      </div>
    );
  }
}

SSELiveImageViewer.propTypes = propTypes;
SSELiveImageViewer.defaultProps = defaultProps;

export default SSELiveImageViewer;
