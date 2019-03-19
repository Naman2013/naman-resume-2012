import { ModalImg } from 'app/modules/telescope/components/modal-img';
import React, { Component } from 'react';
import { ModuleContainer } from './index';

export class DayNightMap extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { dayNightMapURL } = this.props;
    const { isModalOpen } = this.state;
    return (
      <ModuleContainer title="Day/night map">
        <img
          alt="Day night map"
          style={{ width: '100%', cursor: 'pointer' }}
          onClick={this.openModal}
          role="presentation"
          src={dayNightMapURL}
        />

        <ModalImg
          isOpen={isModalOpen}
          imageURL={dayNightMapURL}
          onHide={this.closeModal}
        />
      </ModuleContainer>
    );
  }
}
