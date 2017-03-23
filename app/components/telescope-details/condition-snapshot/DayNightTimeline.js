import React, { Component, PropTypes } from 'react';
import RefreshedImage from './RefreshedImage';

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
