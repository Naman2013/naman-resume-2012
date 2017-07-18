import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import style from './modal-generic.scss';

class ModalGeneric extends Component {
  render() {
    const { closeModal, open, title, description, closeButtonText } = this.props;
    return (
      <Modal
        show={open}
        className="generic-modal"
      >

        {
          title &&
            <Modal.Header>
              <div className="title">
                {title}
              </div>
            </Modal.Header>
        }

        <Modal.Body>
          <div className="body">
            {description}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="btn-primary"
            onClick={closeModal}
          >
            {closeButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalGeneric.defaultProps = {
  open: false,
  closeButtonText: 'Dismiss',
};

ModalGeneric.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.any,
  description: PropTypes.any,
  closeButtonText: PropTypes.string,
};

export default ModalGeneric;
