import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import Offline from './Offline';
import s from './AllSkyCamera.scss';

export default class AllSkyCamera extends Component {
  static propTypes = {
    refreshIntervalSec: PropTypes.number.isRequired,
    allSkyCamURL: PropTypes.string.isRequired,
    offlineImageURL: PropTypes.string.isRequired,
    onlineStatus: PropTypes.oneOf(['online', 'offline']).isRequired,
    imageWidth: PropTypes.string.isRequired,
  }

  render() {
    const { offlineImageURL, onlineStatus, refreshIntervalSec, imageWidth } = this.props;

    if (onlineStatus === 'online') {
      return (
        <div
          className={s.allskyCameraWidgetContainer}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <RefreshedImage
            imageURL={this.props.allSkyCamURL}
            refreshIntervalSec={refreshIntervalSec}
            imageAltText="All sky camera"
            maxImageWidth={imageWidth}
          />
        </div>
      );
    }

    if (onlineStatus === 'offline') {
      return (
        <Offline offlineImageURL={offlineImageURL} />
      );
    }

    return null;
  }
}
