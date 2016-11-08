import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ModalGeneric extends Component {
  render() {
    const { closeModal, open, title, description } = this.props;

    return(
      <Modal
        show={ open }
        className="missionModal reserveMissionModal">

        <Modal.Body>
          <div className="mission-schedule">
            <h4>What is UTC?</h4>
            <p>UTC is blah blah blah...</p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="btn-primary"
            onClick={ closeModal }>Dismiss
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalGeneric.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ModalGeneric;
