/***********************************
* V4 Submit Reply Feedback Modal
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/style/buttons/Button';
import styles from './Modals.style'

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const SubmitReplyFeedbackModal = (props) => {
  const {
    modalActions,
    message,
  } = props;

  return (
    <form className="root">
      <div className="title">Ask an Astronomer</div>
      <div className="prompt-text" dangerouslySetInnerHTML={{ __html: message }}/>
      <div className="actions">
        <Button onClickEvent={modalActions.closeModal} text="Done" />
      </div>
      <style jsx>{styles}</style>
    </form>
  );
};

SubmitReplyFeedbackModal.propTypes = {
  modalActions: shape({
    closeModal: func,
    setModal: func,
    showModal: func,
  }).isRequired,
  message: string,
};

SubmitReplyFeedbackModal.defaultProps = {
  message: '',
};

export default SubmitReplyFeedbackModal;
