import React from 'react';
import { Modal } from 'react-bootstrap';
import { Magnifier } from 'react-image-magnifiers';

export const ModalImg = props => {
  const {
    isOpen,
    imageURL,
    onHide,
    customClassName,
    magnifierClassName,
  } = props;
  return (
    <Modal
      size="lg"
      centered
      show={isOpen}
      onHide={onHide}
      dialogClassName={customClassName}
    >
      <Modal.Body>
        <Magnifier imageSrc={imageURL} className={magnifierClassName} />
      </Modal.Body>
    </Modal>
  );
};
