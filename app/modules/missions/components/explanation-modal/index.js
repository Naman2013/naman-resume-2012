import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '../../../../components/common/style/buttons/Button';

export class ExplanationModal extends Component {
  render() {
    const { onHide, show, text } = this.props;

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p>{text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button text="Close" onClickEvent={onHide} />
        </Modal.Footer>
      </Modal>
    );
  }
}
