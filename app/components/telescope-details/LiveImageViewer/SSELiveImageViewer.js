import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from 'lodash/noop';

import { setImageDataToSnapshot } from '../../../modules/starshare-camera/starshare-camera-actions';

import LiveImageViewer from './';
import VirtualTelescopeViewer from '../../VirtualTelescopeViewer';
import TelescopeImageLoader from '../../common/telescope-image-loader';
import obsIdTeleIdDomeIdFromTeleId from '../../../utils/obsid-teleid-domeid-from-teleid';
import generateSseImageLoader from '../../../utils/generate-sse-image-source';

const propTypes = {
  timestamp: PropTypes.number,
  coordinateArray: PropTypes.arrayOf(PropTypes.string),
  missionData: PropTypes.arrayOf(PropTypes.string),
  objectTitleShort: PropTypes.string,
  processing: PropTypes.string,
  schedulingMember: PropTypes.string,
  callSource: PropTypes.string,
  actions: PropTypes.shape({
    setImageDataToSnapshot: PropTypes.isRequired,
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
  timestamp: 0,
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
  actions: bindActionCreators({
    setImageDataToSnapshot,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class SSELiveImageViewer extends Component {
  handleZoomUpdate = (scale) => {
    this.props.actions.setImageDataToSnapshot({
      zoom: scale,
    });
  }

  handlePositionChange = ({ x, y }) => {
    this.props.actions.setImageDataToSnapshot({
      originX: x,
      originY: y,
    });
  }

  render() {
    const {
      timestamp,
      coordinateArray,
      missionData,
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
      showInfoButton,
      handleInfoClick,
    } = this.props;

    const { obsId, domeId } = obsIdTeleIdDomeIdFromTeleId(teleId);
    const imageSource = generateSseImageLoader(teleSystem, telePort);
    const teleThumbWidth = '866px';

    return (
      <LiveImageViewer onZoomChange={this.handleZoomUpdate}>
        <VirtualTelescopeViewer
          timestamp={timestamp}
          coordinateArray={coordinateArray}
          missionData={missionData}
          objectTitleShort={objectTitleShort}
          processing={processing}
          schedulingMember={schedulingMember}
          showInfoButton={showInfoButton}
          handleInfoClick={handleInfoClick}
          onPositionChange={this.handlePositionChange}
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
    );
  }
}

SSELiveImageViewer.propTypes = propTypes;
SSELiveImageViewer.defaultProps = defaultProps;

export default SSELiveImageViewer;
