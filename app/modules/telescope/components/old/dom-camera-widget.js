import { ModalImg } from 'app/modules/telescope/components/modal-img';
import React, { Component } from 'react';
import { ImagePortalViewer, ModuleContainer } from './index';

export class DomCameraWidget extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { imageUrl } = this.props;
    const { isModalOpen } = this.state;

    return (
      <ModuleContainer title="Dome view">
        <ImagePortalViewer imageURL={imageUrl} onClick={this.openModal} />

        <ModalImg
          isOpen={isModalOpen}
          imageURL={imageUrl}
          onHide={this.closeModal}
        />
      </ModuleContainer>
    );
  }
}
