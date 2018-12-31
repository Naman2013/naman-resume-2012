/***********************************
* V4 Submit Answer Feedback Modal
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import Button from 'components/common/style/buttons/Button';
import styles from './Modals.style';
import messages from './SubmitAnswerFeedbackModal.messages';

const {
  func,
  shape,
  string,
} = PropTypes;

const SubmitAnswerFeedbackModal = (props) => {
  const {
    modalActions,
    message,
    intl,
  } = props;

  return (
    <form className="root">
      <div className="title">{intl.formatMessage(messages.AskAnAstronomer)}</div>
      <div className="prompt-text" dangerouslySetInnerHTML={{ __html: message }}/>
      <div className="actions">
        <Button onClickEvent={modalActions.closeModal} text={intl.formatMessage(messages.Done)} />
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
  intl: intlShape.isRequired,
};

SubmitAnswerFeedbackModal.defaultProps = {
  message: '',
};

export default injectIntl(SubmitAnswerFeedbackModal);
