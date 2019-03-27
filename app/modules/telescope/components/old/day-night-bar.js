import { ModalImg } from 'app/modules/telescope/components/modal-img';
import React, { Component } from 'react';
import { ModuleContainer, SimpleList } from './index';

const data = [
  { title: 'Current time:', field: '14:40' },
  { title: 'Domes open:', field: '18:40' },
  { title: 'Sunset', field: '18:45' },
  { title: 'Astro twilight starts', field: '19:40 (mission start)' },
  { title: 'Astro twilight ends:', field: '20:07' },
  { title: 'Astro twilight starts:', field: '05:42' },
  { title: 'Astro twilight ends:', field: '06:05 (mission end)' },
  { title: 'Sunrise:', field: '07:03' },
];

export class DayNightBar extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { dayNightBarPanelURL } = this.props;
    const { isModalOpen } = this.state;
    return (
      <ModuleContainer title="Day/night bar">
        <img
          style={{ maxWidth: '100%', cursor: 'pointer' }}
          src={dayNightBarPanelURL}
          alt="day Night Bar Panel"
          role="presentation"
          onClick={this.openModal}
        />
        <ModalImg
          isOpen={isModalOpen}
          imageURL={dayNightBarPanelURL}
          onHide={this.closeModal}
        />
        <SimpleList data={data} />
      </ModuleContainer>
    );
  }
}
