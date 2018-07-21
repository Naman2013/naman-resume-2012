import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import uniqueId from 'lodash/uniqueId';
import { DeviceContext } from 'providers/DeviceProvider';
import Button from 'components/common/style/buttons/Button';
import LargeButtonWithRightIcon from 'components/common/style/buttons/LargeButtonWithRightIcon';
import { smallProfPic } from 'styles/mixins/utilities';
import styles from './ViewImagesButton.style';

class ViewImagesButton extends Component {
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
    console.log(error);
  }

  render() {
    const { images } = this.props;
    const { currentImageIdx } = this.state;
    const formattedImgs = images.map(image => ({ src: image }));
    const firstImage = images.length > 0 && images[0];
    const buttonStyle = Object.assign(smallProfPic(firstImage), { height: '20px', width: '20px' });
    const littleButtonStyle = Object.assign(buttonStyle, { margin: '0 auto' })
    return (
      <div>
        <DeviceContext.Consumer>
          {context => (<div
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
            {firstImage && context.isDesktop ? <LargeButtonWithRightIcon
              text="Pics"
              onClickEvent={this.toggleLightbox}
              renderIcon={() => <div style={buttonStyle} />}
            /> :
            <Button
              onClickEvent={this.toggleLightbox}
              renderIcon={() => <div style={littleButtonStyle} />}
            />
            }
            <style jsx>{styles}</style>

            <style jsx global>{`
              #lightboxBackdrop {
              z-index: 9999999;
            `}</style>
          </div>)}
        </DeviceContext.Consumer>
      </div>
    );
  }
}

export default ViewImagesButton;
