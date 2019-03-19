import React from 'react';
import { Modal } from 'react-bootstrap';
import { Magnifier } from 'react-image-magnifiers';

export const ModalImg = props => {
  const { isOpen, imageURL, onHide } = props;
  return (
    <Modal size="lg" centered show={isOpen} onHide={onHide}>
      <Modal.Body>
        <Magnifier imageSrc={imageURL} />
      </Modal.Body>
    </Modal>
  );
};
