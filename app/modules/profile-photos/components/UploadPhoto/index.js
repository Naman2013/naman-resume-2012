// flow

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './index.scss';

type TUploadPhoto = {
  isOpen: Boolean,
  setOpen: Function,
};

export const UploadPhoto = (props: TUploadPhoto) => {
  const {
    isOpen,
    setOpen,
  } = props;

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <div className="upload-photo-container">
      <Button onClick={open}>Upload Photo</Button>
      <Modal
        show={isOpen}
        onHide={close}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="filter-modal"
      >
        <div>Hello Roma!</div>
      </Modal>
    </div>
  );
};
