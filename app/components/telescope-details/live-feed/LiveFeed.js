import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  };

  static defaultProps = {
    onlineStatus: 'offline',
    instrument: null,
    obsAlert: '',
  };

  render() {
    const {
      fetchingOnlineStatus,
      obsAlert,
      onlineStatus,
      instrument,
      offlineImageSource,
    } = this.props;

    if (fetchingOnlineStatus) {
      return (
        <div className="root">
          <GenericLoadingBox />

          <style jsx>{
              `
                .root {
                  padding-top: 80px;
                }
              `
          }</style>
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
        { determineImageLoader(instrument) }
        <style jsx>{
          `
            .root {
             /* min-height: 456px;*/
            }
          `
        }</style>
      </div>
    );
  }
}

export default LiveFeed;
