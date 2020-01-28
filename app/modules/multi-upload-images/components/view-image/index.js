import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { ViewImageModal } from 'app/modules/multi-upload-images/components/view-image/modal';

class ViewImage extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = {
    lightboxIsOpen: false,
    currentImageIdx: 0,
  };

  onKeyboardClickPrev = event => {
    if (event.keyCode === 37) {
      this.onClickPrev();
    }
  };

  onClickPrev = () => {
    const { currentImageIdx } = this.state;
    if (currentImageIdx > 0) {
      this.setState(state => ({
        currentImageIdx: state.currentImageIdx - 1,
      }));
    }
  };

  onKeyboardClickNext = event => {
    if (event.keyCode === 39) {
      this.onClickNext();
    }
  };

  onClickNext = () => {
    const { currentImageIdx } = this.state;
    const { images } = this.props;
    if (currentImageIdx < images.length - 1) {
      this.setState(state => ({
        currentImageIdx: state.currentImageIdx + 1,
      }));
    }
  };

  goToImage = idx => {
    this.setState({
      currentImageIdx: idx,
    });
    this.toggleLightbox();
  };

  toggleLightbox = () => {
    const { lightboxIsOpen } = this.state;
    if (!lightboxIsOpen) {
      document.body.addEventListener('keydown', this.onKeyboardClickPrev);
      document.body.addEventListener('keydown', this.onKeyboardClickNext);
    } else {
      document.body.removeEventListener('keydown', this.onKeyboardClickPrev);
      document.body.removeEventListener('keydown', this.onKeyboardClickNext);
    }
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
    }));
  };

  render() {
    const { images } = this.props;
    const { currentImageIdx, lightboxIsOpen } = this.state;
    return (
      <div className="view-image-root">
        <div className="carousel-image-container">
          <div className="carousel-wrapper">
            {!!(images.length > 1) && (
              <button
                onClick={this.onClickPrev}
                disabled={currentImageIdx === 0}
                className="slick-arrow-btn slick-prev"
              ></button>
            )}
            <div className="carousel-image-wrapper">
              <img
                className="carousel-image"
                src={images[currentImageIdx]}
                onClick={() => this.goToImage(currentImageIdx)}
              />
            </div>
            {!!(images.length > 1) && (
              <button
                onClick={this.onClickNext}
                disabled={currentImageIdx === images.length - 1}
                className="slick-arrow-btn slick-next"
              ></button>
            )}
          </div>
        </div>
        <ViewImageModal
          showModal={lightboxIsOpen}
          onHide={() =>
            this.setState({
              lightboxIsOpen: false,
            })
          }
          images={images}
          onClickPrev={this.onClickPrev}
          onClickNext={this.onClickNext}
          currentImageIndex={currentImageIdx}
        />
      </div>
    );
  }
}

export default ViewImage;
