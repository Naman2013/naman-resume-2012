import React, { PropTypes } from 'react';
import RefreshedImage from './RefreshedImage';

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
