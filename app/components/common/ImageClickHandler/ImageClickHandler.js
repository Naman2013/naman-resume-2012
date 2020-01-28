import React from 'react';
import Modal from 'react-modal';
import { customModalStylesFitContent } from 'app/styles/mixins/utilities';

import ImagePreview from './ImagePreview';
import { GUIDE_PANEL_IMAGE_ENDPOINT_URL } from '../../../services/guides/guide-data';
import style from './imageClickHandler.style';

export default class ImageClickHandler extends React.Component {
  state = {
    imageId: null,
    modalOpen: false,
  };

  handleClick = e => {
    const { imageUrl } = this.props;
    if (this.state.imageId === null && e.target.tagName === 'IMG') {
      this.setState({
        imageId: e.target.getAttribute('sloohrelatedimagerecordid'),
        modalOpen: true,
      });
    }
  };

  closePopup = () => {
    this.setState({
      imageId: null,
      modalOpen: false,
    });
  };

  render() {
    const { imageUrl } = this.props;
    const { modalOpen, imageId } = this.state;
    return (
      <div onClick={this.handleClick}>
        <Modal
          ariaHideApp={false}
          isOpen={modalOpen}
          style={customModalStylesFitContent}
          onRequestClose={this.closePopup}
        >
          <i className="fa fa-close" onClick={this.closePopup} />
          <ImagePreview
            withMagnifier
            url={GUIDE_PANEL_IMAGE_ENDPOINT_URL}
            id={imageId}
            imageUrl={imageUrl}
          />
        </Modal>
        {this.props.children}
        <style jsx>{style}</style>
      </div>
    );
  }
}
