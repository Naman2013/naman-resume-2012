import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';

class DownloadImage extends Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired
  }

  state = {
    lightboxIsOpen: false,
  }

  toggleLightbox = (e) => {
    e.preventDefault();
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
    }));
  }

  render () {
    const { imageURL } = this.props;
    const formattedImgs = [{ src: imageURL }];
    return (
      <div
        className=""
      >
        <Lightbox
          images={formattedImgs}
          isOpen={this.state.lightboxIsOpen}
          onClose={this.toggleLightbox}
          showThumbnails={false}
          showImageCount={false}
        />
        <button onClick={this.toggleLightbox} className="action">
          <span className="fa fa-download"></span>
          <div className="action-description">Download</div>
        </button>
          <style jsx global>{`
            #lightboxBackdrop {
              z-index: 9999999;
          `}</style>
      </div>
    );
  }
}

export default DownloadImage;
