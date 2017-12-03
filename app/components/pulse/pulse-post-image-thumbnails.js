import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import uniqueId from 'lodash/uniqueId';

class PulsePostThumbnail extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired
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
      currentImageIdx: idx
    })
  }

  toggleLightbox = (idx) => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      currentImageIdx: idx
    }));
  }

  render () {
    const { images } = this.props;
    const formattedImgs = images.map(image => ({ src: image }));
    return (
      <div
        className="thumbnails-container"
      >
        <Lightbox
        currentImage={this.state.currentImageIdx}
          images={formattedImgs}
          isOpen={this.state.lightboxIsOpen}
          onClose={this.toggleLightbox}
          onClickThumbnail={this.goToImage}
          onClickPrev={this.onClickPrev}
          onClickNext={this.onClickNext}
          showThumbnails={images.length > 1}
        />
        {images.map((image, idx) => <figure key={image}>
          <a onClick={() => this.toggleLightbox(idx)}>
            <img
              key={uniqueId()}
              src={image}
              className="thumbnail"
            />
          </a>
        </figure>)}
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
