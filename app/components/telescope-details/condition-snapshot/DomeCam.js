import React from 'react';
import PropTypes from 'prop-types';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import Offline from './Offline';
import classnames from 'classnames';

export default function DomeCam({ domeCamURL, refreshIntervalSec, onlineStatus, offlineImageURL, imageWidth }) {
  if (onlineStatus === 'online') {
    return (
      <div>
        <RefreshedImage
          imageURL={domeCamURL}
          refreshIntervalSec={refreshIntervalSec}
          imageAltText="Dome camera"
          maxImageWidth={imageWidth}
        />
        <video controls playsInline autoPlay muted loop>
          <source src="https://vega.slooh.com/video/tests/teide_domecam_timelapse_2018-02-04-1733utc.mp4" type="video/mp4" />
        </video>
      </div>
      )
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
