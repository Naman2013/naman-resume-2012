import React from 'react';
import PropTypes from 'prop-types';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';
import TelescopeOffline from '../telescope-offline/telescope-offline';
import determineImageLoader from '../determine-image-loader';

const LiveFeed = (props) => {
  const {
    viewportHeight,
    fetchingOnlineStatus,
    obsAlert,
    onlineStatus,
    instrument,
    offlineImageSource,
  } = props;

  if (fetchingOnlineStatus) {
    return (
      <div className="root">
        <GenericLoadingBox />

        <style jsx>{`
          .root {
            padding-top: 80px;
          }
        `}
        </style>
      </div>
    );
  }

  if (onlineStatus === 'offline') {
    return <TelescopeOffline imageSource={offlineImageSource} offlineStatusMessage={obsAlert} />;
  }

  return (
    <div className="root">
      {determineImageLoader(instrument, { viewportHeight })}
    </div>
  );
};

LiveFeed.propTypes = {
  viewportHeight: PropTypes.number,
  fetchingOnlineStatus: PropTypes.bool.isRequired,
  obsAlert: PropTypes.string,
  onlineStatus: PropTypes.oneOf(['online', 'offline']),
  instrument: PropTypes.shape({
    instrImageSourceType: PropTypes.string.isRequired,
    instrCameraSourceType: PropTypes.string.isRequired,
  }),
  offlineImageSource: PropTypes.string.isRequired,
};

LiveFeed.defaultProps = {
  viewportHeight: 0,
  onlineStatus: 'offline',
  instrument: null,
  obsAlert: '',
};


export default LiveFeed;
