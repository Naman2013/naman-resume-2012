/***********************************
* V4 Submit Answer Feedback Modal
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

const SubmitAnswerFeedbackModal = (props) => {
  const {
    modalActions,
    message,
  } = props;

  return (
    <form className="root">
      <div className="title">Ask an Astronomer</div>
      <div className="prompt-text" dangerouslySetInnerHTML={{ message }}/>
      <div className="actions">
        <Button onClickEvent={modalActions.closeModal} text="Done" />
      </div>
      <style jsx>{styles}</style>
    </form>
  );
};

SubmitAnswerFeedbackModal.propTypes = {
  modalActions: shape({
    closeModal: func,
    setModal: func,
    showModal: func,
  }).isRequired,
  message: string,
};

SubmitAnswerFeedbackModal.defaultProps = {

};

export default SubmitAnswerFeedbackModal;
