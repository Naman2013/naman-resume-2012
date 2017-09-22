import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import TelescopeOffline from '../telescope-offline/telescope-offline';
import determineImageLoader from '../determine-image-loader';

class LiveFeed extends Component {
  static propTypes = {
    fetchingOnlineStatus: PropTypes.bool.isRequired,
    obsAlert: PropTypes.string,
    onlineStatus: PropTypes.oneOf(['online', 'offline']),
    instrument: PropTypes.shape({
      instrImageSourceType: PropTypes.string.isRequired,
      instrCameraSourceType: PropTypes.string.isRequired,
    }),
    offlineImageSource: PropTypes.string.isRequired,
    activeMission: PropTypes.shape({
      timestamp: PropTypes.number,
      coordinateArray: PropTypes.arrayOf(PropTypes.string),
      missionData: PropTypes.arrayOf(PropTypes.string),
      objectTitleShort: PropTypes.string,
      processing: PropTypes.string,
      schedulingMember: PropTypes.string,
    }),
    activeNeoview: PropTypes.bool,
    handleInfoClick: PropTypes.func,
  };

  static defaultProps = {
    onlineStatus: 'offline',
    instrument: null,
    obsAlert: '',
    activeMission: {
      timestamp: 0,
      coordinateArray: [],
      missionData: [],
      objectTitleShort: '',
      processing: '',
      schedulingMember: '',
    },
    activeNeoview: false,
    handleInfoClick: noop,
  };

  render() {
    const {
      fetchingOnlineStatus,
      obsAlert,
      onlineStatus,
      instrument,
      offlineImageSource,
      activeMission,
      activeNeoview,
      handleInfoClick,
    } = this.props;

    const neoview = {
      activeNeoview,
      handleInfoClick,
    };

    if (fetchingOnlineStatus) {
      return (
        <div className="root">
          <GenericLoadingBox />

          <style jsx>{`
            .root {
              padding-top: 80px;
            }
          `}</style>
        </div>
      );
    }

    if (onlineStatus === 'offline') {
      return (
        <TelescopeOffline
          imageSource={offlineImageSource}
          offlineStatusMessage={obsAlert}
        />
      );
    }

    return (
      <div className="root">
        {
          determineImageLoader(instrument, {
            activeMission,
            neoview,
          })
        }
      </div>
    );
  }
}

export default LiveFeed;
