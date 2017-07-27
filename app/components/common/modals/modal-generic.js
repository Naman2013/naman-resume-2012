import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import style from './modal-generic.scss';

class ModalGeneric extends Component {
  render() {
    const { closeModal, open, title, description, closeButtonText, bg } = this.props;
    return (
      <Modal
        show={open}
        className={`generic-modal`}
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
        <style>{`
          div.modal-content {
            background-color: ${bg};
          }
        `}</style>
      </Modal>
    );
  }
}

ModalGeneric.defaultProps = {
  open: false,
  closeButtonText: 'Dismiss',
  bg: 'white',
};

ModalGeneric.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.any,
  description: PropTypes.any,
  closeButtonText: PropTypes.string,
  bg: PropTypes.string,
};

export default ModalGeneric;
