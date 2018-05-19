import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from 'lodash/noop';

import { setImageDataToSnapshot } from '../../../modules/starshare-camera/starshare-camera-actions';
import {
  resetViewedMissionState,
  incrementMissionCounter,
  updateRecentlyViewedMissionID,
} from '../../../modules/telescope-details/actions';

import TelescopeImageLoader from '../../common/telescope-image-loader';
import obsIdTeleIdDomeIdFromTeleId from '../../../utils/obsid-teleid-domeid-from-teleid';
import generateSseImageLoader from '../../../utils/generate-sse-image-source';

const mapStateToProps = ({
  activeTelescopeMissions: { activeTelescopeMission },
  routing: { locationBeforeTransitions },
  telescopeDetails: { viewedMissionsCounter, recentlyViewedMissionID },
}) => ({
  routerState: locationBeforeTransitions,
  currentMission: activeTelescopeMission,
  viewedMissionsCounter,
  recentlyViewedMissionID,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setImageDataToSnapshot,
      resetViewedMissionState,
      incrementMissionCounter,
      updateRecentlyViewedMissionID,
    },
    dispatch,
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
class SSELiveImageViewer extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      setImageDataToSnapshot: PropTypes.func.isRequired,
      resetViewedMissionState: PropTypes.func.isRequired,
      incrementMissionCounter: PropTypes.func.isRequired,
      updateRecentlyViewedMissionID: PropTypes.func.isRequired,
    }),
    currentMission: PropTypes.shape({
      scheduledMissionId: PropTypes.number,
    }),
    routerState: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    viewedMissionsCounter: PropTypes.number,
    recentlyViewedMissionID: PropTypes.number,
    // TODO: complete the validation
    // imageSource: PropTypes.
    // teleThumbWidth: PropTypes.
    // teleFade: PropTypes.
    // clipped: PropTypes.
    // missionFormat: PropTypes.
    // teleId: PropTypes.
  };

  static defaultProps = {
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
    viewedMissionsCounter: 0,
    recentlyViewedMissionID: 0,
    // TODO: complete the validation
    // imageSource: PropTypes.
    // teleThumbWidth: PropTypes.
    // teleFade: PropTypes.
    // clipped: PropTypes.
    // missionFormat: PropTypes.
    // teleId: PropTypes.
  };

  componentWillReceiveProps(nextProps) {
    const {
      currentMission: { scheduledMissionId },
      routerState: { pathname },
      viewedMissionsCounter,
      recentlyViewedMissionID,
    } = nextProps;

    if (pathname !== this.props.routerState.pathname) {
      this.props.actions.resetViewedMissionState();
    }

    if (pathname === this.props.routerState.pathname) {
      if (scheduledMissionId && (scheduledMissionId !== recentlyViewedMissionID)) {
        this.props.actions.incrementMissionCounter();
        this.props.actions.updateRecentlyViewedMissionID(scheduledMissionId);
        this.setState(() => ({
          transitionVideoOpacity: (viewedMissionsCounter > 0) ? 1 : 0,
        }));
      }
    }
  }

  render() {
    const {
      telePort,
      teleSystem,
      teleId,
      teleFade,
      missionFormat,
    } = this.props;

    const { obsId, domeId } = obsIdTeleIdDomeIdFromTeleId(teleId);
    const imageSource = generateSseImageLoader(teleSystem, telePort);
    const teleThumbWidth = '866px';

    return (
      <TelescopeImageLoader
        imageSource={imageSource}
        teleId={teleId}
        obsId={obsId}
        domeId={domeId}
        teleThumbWidth={teleThumbWidth}
        teleFade={teleFade}
        missionFormat={missionFormat}
      />
    );
  }
}

export default SSELiveImageViewer;
