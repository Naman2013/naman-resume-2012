import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';

export default class DayNightTimeline extends Component {
  static propTypes = {
    dayNightBarURL: PropTypes.string.isRequired,
    refreshIntervalSec: PropTypes.number.isRequired,
  }

  render() {
    return (
      <RefreshedImage
        imageURL={this.props.dayNightBarURL}
        refreshIntervalSec={this.props.refreshIntervalSec}
        imageAltText="Day night status bar"
      />
    );
  }
}
