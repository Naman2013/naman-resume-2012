import React from 'react';
import { Modal } from 'react-bootstrap';
import { Magnifier } from 'react-image-magnifiers';

export const ModalImg = props => {
  const { isOpen, imageURL } = props;
  return (
    <Modal size="lg" centered show={isOpen} onHide={this.closeModal}>
      <Modal.Body>
        <Magnifier imageSrc={imageURL} />
      </Modal.Body>
    </Modal>
  );
};
