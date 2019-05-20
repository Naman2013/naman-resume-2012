/** *********************************
 * V4 Submit Reply Feedback Modal
 *
 *
 *
 ********************************** */

import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Button } from 'react-bootstrap';

const { func, shape, string } = PropTypes;

const SubmitReplyFeedbackModal = props => {
  const {
    modalActions,
    message,
    updateQuestionsList,
    title,
    doneButtonLabel,
  } = props;

  return (
    <div className="aaa-modal-success">
      <h1 className="modal-h">{title}</h1>

      <div
        className="modal-p mt-5"
        dangerouslySetInnerHTML={{ __html: message }}
      />
      <Button
        onClick={() => {
          updateQuestionsList();
          modalActions.closeModal();
        }}
        className="modal-btn"
      >
        {doneButtonLabel}
      </Button>
    </div>
  );
};

SubmitReplyFeedbackModal.propTypes = {
  modalActions: shape({
    closeModal: func,
    setModal: func,
    showModal: func,
  }).isRequired,
  message: string,
  updateQuestionsList: func.isRequired,
  title: string,
  doneButtonLabel: string,
};

SubmitReplyFeedbackModal.defaultProps = {
  message: '',
  title: '',
  doneButtonLabel: '',
};

export default SubmitReplyFeedbackModal;
