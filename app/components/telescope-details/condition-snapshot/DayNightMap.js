import React from 'react';
import PropTypes from 'prop-types';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';

export default function DayNightMap({ refreshIntervalSec, dayNightMapURL }) {
  return (
    <RefreshedImage
      imageURL={dayNightMapURL}
      refreshIntervalSec={refreshIntervalSec}
      imageAltText="Day night map"
    />
  );
}

DayNightMap.propTypes = {
  refreshIntervalSec: PropTypes.number.isRequired,
  dayNightMapURL: PropTypes.string.isRequired,
};
