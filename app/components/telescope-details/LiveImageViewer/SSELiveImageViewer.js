import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from 'lodash/noop';

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
  // TODO: complete the validation
  // imageSource: PropTypes.
  // teleThumbWidth: PropTypes.
  // teleFade: PropTypes.
  // clipped: PropTypes.
  // missionFormat: PropTypes.
  // teleId: PropTypes.
};

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

@connect(null, mapDispatchToProps)
class SSELiveImageViewer extends Component {
  state = {
    viewerDimensions: { height: 500 },
  };

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

  contentResizeCallback(viewerDimensions) {
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

    const { viewerDimensions: { width, height } } = this.state;

    const { obsId, domeId } = obsIdTeleIdDomeIdFromTeleId(teleId);
    const imageSource = generateSseImageLoader(teleSystem, telePort);
    const teleThumbWidth = '866px';

    return (
      <div>
        <Transition
          height={height}
        />
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
      </div>
    );
  }
}

SSELiveImageViewer.propTypes = propTypes;
SSELiveImageViewer.defaultProps = defaultProps;

export default SSELiveImageViewer;
