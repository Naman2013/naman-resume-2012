import { ModalImg } from 'app/modules/telescope/components/modal-img';
import React, { Component } from 'react';
import { ModuleContainer } from './index';

export class Satellite extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { satelliteImageURL } = this.props;
    const { isModalOpen } = this.state;

    return (
      <ModuleContainer title="Satellite">
        <img
          alt="satellite"
          style={{ width: '100%', cursor: 'pointer' }}
          src={satelliteImageURL}
          onClick={this.openModal}
          role="presentation"
        />
        <ModalImg
          isOpen={isModalOpen}
          imageURL={satelliteImageURL}
          onHide={this.closeModal}
        />
      </ModuleContainer>
    );
  }
}
