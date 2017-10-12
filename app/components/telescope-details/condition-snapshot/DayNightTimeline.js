import React from 'react';
import PropTypes from 'prop-types';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';

const propTypes = {
  dayNightBarURL: PropTypes.string.isRequired,
  refreshIntervalSec: PropTypes.number.isRequired,
};

const DayNightTimeline = ({ dayNightBarURL, refreshIntervalSec }) => (
  <RefreshedImage
    imageURL={dayNightBarURL}
    refreshIntervalSec={refreshIntervalSec}
    imageAltText="Day night status bar"
  />
);

DayNightTimeline.propTypes = propTypes;

export default DayNightTimeline;
