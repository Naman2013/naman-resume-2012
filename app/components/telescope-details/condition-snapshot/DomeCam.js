import React, { PropTypes } from 'react';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import Offline from './Offline';

export default function DomeCam({ domeCamURL, refreshIntervalSec, onlineStatus, offlineImageURL }) {
  if (onlineStatus === 'online') {
    return (
      <RefreshedImage
        imageURL={domeCamURL}
        refreshIntervalSec={refreshIntervalSec}
        imageAltText="Dome camera"
      />)
    ;
  }

  if (onlineStatus === 'offline') {
    return (
      <Offline
        offlineImageURL={offlineImageURL}
      />
    );
  }

  return null;
}

DomeCam.propTypes = {
  domeCamURL: PropTypes.string.isRequired,
  refreshIntervalSec: PropTypes.number.isRequired,
  offlineImageURL: PropTypes.string.isRequired,
  onlineStatus: PropTypes.oneOf(['offline', 'online']).isRequired,
};
