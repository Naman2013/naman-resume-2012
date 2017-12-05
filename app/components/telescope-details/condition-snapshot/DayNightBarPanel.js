import React from 'react';
import PropTypes from 'prop-types';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';

export default function DayNightBarPanel({ refreshIntervalSec, dayNightBarPanelURL, imageWidth }) {
  return (
    <RefreshedImage
      imageURL={dayNightBarPanelURL}
      refreshIntervalSec={refreshIntervalSec}
      imageAltText="Day night bar"
      maxImageWidth={imageWidth}
    />
  );
}

DayNightBarPanel.propTypes = {
  refreshIntervalSec: PropTypes.number.isRequired,
  dayNightBarPanelURL: PropTypes.string.isRequired,
  imageWidth: PropTypes.string.isRequired,
};
