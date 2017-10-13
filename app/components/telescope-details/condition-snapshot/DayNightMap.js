import React from 'react';
import PropTypes from 'prop-types';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';

export default function DayNightMap({ refreshIntervalSec, dayNightMapURL, imageWidth }) {
  return (
    <RefreshedImage
      imageURL={dayNightMapURL}
      refreshIntervalSec={refreshIntervalSec}
      imageAltText="Day night map"
      maxImageWidth={imageWidth}
    />
  );
}

DayNightMap.propTypes = {
  refreshIntervalSec: PropTypes.number.isRequired,
  dayNightMapURL: PropTypes.string.isRequired,
  imageWidth: PropTypes.string.isRequired,
};
