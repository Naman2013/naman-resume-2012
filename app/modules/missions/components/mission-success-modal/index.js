import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '../../../../components/common/style/buttons/Button';
import './styles.scss';

export class MissionSuccessModal extends Component {
  render() {
    const { onHide, show, reservedMissionData } = this.props;

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Mission successfully scheduled
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{reservedMissionData.title}</h4>
          <p>{reservedMissionData.explanation}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button text="Learn" onClickEvent={onHide} />
        </Modal.Footer>
      </Modal>
    );
  }
}
