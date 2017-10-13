import React from 'react';
import PropTypes from 'prop-types';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';

const propTypes = {
  dayNightBarURL: PropTypes.string.isRequired,
  refreshIntervalSec: PropTypes.number.isRequired,
  imageWidth: PropTypes.string,
};

const defaultProps = {
  imageWidth: '100%',
};

const DayNightTimeline = ({ dayNightBarURL, refreshIntervalSec, imageWidth }) => (
  <RefreshedImage
    imageURL={dayNightBarURL}
    refreshIntervalSec={refreshIntervalSec}
    imageAltText="Day night status bar"
    maxImageWidth={imageWidth}
  />
);

DayNightTimeline.propTypes = propTypes;
DayNightTimeline.defaultProps = defaultProps;

export default DayNightTimeline;
