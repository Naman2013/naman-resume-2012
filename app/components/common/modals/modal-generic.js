import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import style from './modal-generic.scss';

class ModalGeneric extends Component {
  render() {
    const { closeModal, open, title, description } = this.props;

    return(
      <Modal
        show={ open }
        className="generic-modal">

        <Modal.Header>
          <h1 className="title">{ title }</h1>
        </Modal.Header>

        <Modal.Body>
          <p className="body">{ description }</p>
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

ModalGeneric.defaultProps = {
  open: false,
};

ModalGeneric.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ModalGeneric;
