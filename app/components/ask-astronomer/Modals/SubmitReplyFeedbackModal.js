/** *********************************
 * V4 Submit Reply Feedback Modal
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import Button from 'components/common/style/buttons/Button';
import styles from './Modals.style';
import messages from './SubmitAnswerFeedbackModal.messages';

const { func, shape, string } = PropTypes;

const SubmitReplyFeedbackModal = (props) => {
  const { modalActions, message, intl, updateQuestionsList, } = props;

  return (
    <form className="root">
      <div className="title">{intl.formatMessage(messages.AskAnAstronomer)}</div>
      <div className="prompt-text" dangerouslySetInnerHTML={{ __html: message }} />
      <div className="actions">
        <Button
          onClickEvent={() => {
            updateQuestionsList();
            modalActions.closeModal();
          }}
          text={intl.formatMessage(messages.Done)}
        />
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
  intl: intlShape.isRequired,
  updateQuestionsList: func.isRequired,
};

SubmitReplyFeedbackModal.defaultProps = {
  message: '',
};

export default injectIntl(SubmitReplyFeedbackModal);
