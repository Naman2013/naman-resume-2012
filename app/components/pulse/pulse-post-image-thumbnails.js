import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import uniqueId from 'lodash/uniqueId';

class PulsePostThumbnail extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  state = {
    lightboxIsOpen: false,
    currentImageIdx: 0,
  }

  onClickPrev = () => {
    this.setState(state => ({
      currentImageIdx: state.currentImageIdx - 1,
    }));
  }

  onClickNext = () => {
    this.setState(state => ({
      currentImageIdx: state.currentImageIdx + 1,
    }));
  }

  goToImage = (idx) => {
    this.setState({
      currentImageIdx: idx,
    });
  }

  toggleLightbox = () => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      currentImageIdx: 0,
    }));
  }

  componentDidCatch(error, info) {
   
  }

  render() {
    const { images } = this.props;
    const { currentImageIdx } = this.state;
    const formattedImgs = images.map(image => ({ src: image }));
    const firstImage = images.length > 0 && images[0];

    return (
      <div
        className="thumbnails-container"
      >
        <Lightbox
          currentImage={currentImageIdx}
          images={formattedImgs}
          isOpen={this.state.lightboxIsOpen}
          onClose={this.toggleLightbox}
          onClickThumbnail={this.goToImage}
          onClickPrev={this.onClickPrev}
          onClickNext={this.onClickNext}
          showThumbnails={images.length > 1}
        />
        {firstImage && <figure key={firstImage}>
          <a onClick={this.toggleLightbox}>
            {images.length > 1 && <div className="image-counter">1 of {images.length}</div>}
            <img
              key={uniqueId()}
              src={firstImage}
              className="thumbnail"
            />
          </a>
        </figure>}
        <style jsx>{`
            .thumbnails-container {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              width: 200px;
              float: right;
              margin: 50px 10px 10px 10px;
            }

            .thumbnail {
              height: 150px;
              width: auto;
            }

            .image-counter {
              font-size: 10px;
              text-align: right;
            }
          `}</style>

        <style jsx global>{`
          #lightboxBackdrop {
          z-index: 9999999;
        `}</style>
      </div>
    );
  }
}

export default PulsePostThumbnail;
