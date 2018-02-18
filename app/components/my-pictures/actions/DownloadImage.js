import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import ActionButton from './ActionButton';

class DownloadImage extends Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['light', 'dark']),
  }

  static defaultProps = {
    theme: 'light',
  };

  state = {
    lightboxIsOpen: false,
  }

  toggleLightbox = (e) => {
    e.preventDefault();
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
    }));
  }

  render() {
    const { imageURL, theme } = this.props;
    const formattedImgs = [{ src: imageURL }];
    return (
      <div>
        <Lightbox
          images={formattedImgs}
          isOpen={this.state.lightboxIsOpen}
          onClose={this.toggleLightbox}
          showThumbnails={false}
          showImageCount={false}
        />

        <ActionButton
          theme={theme}
          handleClick={this.toggleLightbox}
          fontAwesomeIcon="fa-download"
          description="Download"
        />

        <style jsx global>{`
          #lightboxBackdrop {
          z-index: 9999999;
        `}</style>
      </div>
    );
  }
}

export default DownloadImage;
