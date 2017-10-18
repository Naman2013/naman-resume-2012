import React from 'react';
import PropTypes from 'prop-types';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import Offline from './Offline';

export default function DomeCam({ domeCamURL, refreshIntervalSec, onlineStatus, offlineImageURL, imageWidth }) {
  if (onlineStatus === 'online') {
    return (
      <RefreshedImage
        imageURL={domeCamURL}
        refreshIntervalSec={refreshIntervalSec}
        imageAltText="Dome camera"
        maxImageWidth={imageWidth}
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
  imageWidth: PropTypes.string.isRequired,
};
