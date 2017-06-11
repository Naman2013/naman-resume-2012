import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';
import classnames from 'classnames';
import { uniqueId } from 'lodash';
import RefreshedImage from '../../common/refreshed-static-image/RefreshedImage';
import Offline from './Offline';
import s from './AllSkyCamera.scss';

export default class AllSkyCamera extends Component {
  static propTypes = {
    refreshIntervalSec: PropTypes.number.isRequired,
    allSkyCamURL: PropTypes.string.isRequired,
    offlineImageURL: PropTypes.string.isRequired,
    onlineStatus: PropTypes.oneOf(['online', 'offline']).isRequired,
  }

  state = {
    isLightboxOpen: false,
    hideOpenLightbox: true,
  }

  closeLightbox = () => {
    this.setState({
      isLightboxOpen: false,
    });
  }

  openLightbox = () => {
    this.setState({
      isLightboxOpen: true,
    });
  }

  handleMouseEnter = () => {
    this.setState({
      hideOpenLightbox: false,
    });
  }

  handleMouseLeave = () => {
    this.setState({
      hideOpenLightbox: true,
    });
  }

  render() {
    const { offlineImageURL, onlineStatus, refreshIntervalSec } = this.props;
    const { isLightboxOpen, hideOpenLightbox } = this.state;

    const buttonClassnames = classnames(s.openModalAction, {
      hide: hideOpenLightbox,
    });

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
          />

          <button
            className={buttonClassnames}
            onClick={this.openLightbox}
          >
            <span className="fa fa-expand" />
          </button>

          <Lightbox
            images={[{ src: `${this.props.allSkyCamURL}?cb=${uniqueId()}` }]}
            isOpen={isLightboxOpen}
            onClose={this.closeLightbox}
            backdropClosesModal={true}
            showImageCount={false}
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
