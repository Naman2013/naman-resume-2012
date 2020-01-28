import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViewImageModal } from 'app/modules/multi-upload-images/components/view-image/modal';
import { DeviceContext } from 'providers/DeviceProvider';
import Button from 'app/components/common/style/buttons/Button';
import LargeButtonWithRightIcon from 'app/components/common/style/buttons/LargeButtonWithRightIcon';
import { smallProfPic } from 'app/styles/mixins/utilities';
import styles from './ViewImagesButton.style';

class ViewImagesButton extends Component {
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
    const { images } = this.props;
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
  };

  toggleLightbox = e => {
    e.preventDefault();
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
      currentImageIdx: 0,
    }));
  };

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    const { images } = this.props;
    const { currentImageIdx, lightboxIsOpen } = this.state;
    const formattedImgs = images.map(image => ({ src: image }));
    const firstImage = images.length > 0 && images[0];
    const buttonStyle = Object.assign(smallProfPic(firstImage), {
      height: '20px',
      width: '20px',
    });
    const littleButtonStyle = Object.assign(buttonStyle, { margin: '0 auto' });
    return (
      <div>
        <DeviceContext.Consumer>
          {context => (
            <div className="thumbnails-container">
              {/*<Lightbox
                currentImage={currentImageIdx}
                images={formattedImgs}
                isOpen={this.state.lightboxIsOpen}
                onClose={this.toggleLightbox}
                onClickThumbnail={this.goToImage}
                onClickPrev={this.onClickPrev}
                onClickNext={this.onClickNext}
                showThumbnails={images.length > 1}
              />*/}
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
              {firstImage && context.isDesktop ? (
                <LargeButtonWithRightIcon
                  text="Pics"
                  onClickEvent={this.toggleLightbox}
                  renderIcon={() => <div style={buttonStyle} />}
                />
              ) : (
                <Button
                  onClickEvent={this.toggleLightbox}
                  renderIcon={() => <div style={littleButtonStyle} />}
                />
              )}
              <style jsx>{styles}</style>

              <style jsx global>{`
              #lightboxBackdrop {
              z-index: 9999999;
            `}</style>
            </div>
          )}
        </DeviceContext.Consumer>
      </div>
    );
  }
}

export default ViewImagesButton;
