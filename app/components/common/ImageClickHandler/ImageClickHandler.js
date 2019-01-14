import React from 'react';
import Modal from 'react-modal';
import { customModalStylesFitContent } from 'styles/mixins/utilities';

import ImagePreview from './ImagePreview';
import { GUIDE_PANEL_IMAGE_ENDPOINT_URL } from '../../../services/guides/guide-data';
import style from './imageClickHandler.style';

export default class ImageClickHandler extends React.Component {
  state = {
    imageId: null,
  };

  handleClick = (e) => {
    if (e.target.tagName === 'IMG') {
      this.setState({
        imageId: e.target.getAttribute('sloohrelatedimagerecordid'),
      });
    }
  };

  closePopup = () => {
    this.setState({
      imageId: null,
    });
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.imageId != null}
          style={customModalStylesFitContent}
          onRequestClose={this.closePopup}
        >
          <i className="fa fa-close" onClick={this.closePopup} />
          <ImagePreview url={GUIDE_PANEL_IMAGE_ENDPOINT_URL} id={this.state.imageId} />
        </Modal>
        {this.props.children}
        <style jsx>{style}</style>
      </div>
    );
  }
}
