/** *********************************
 * V4 Submit Reply Feedback Modal
 *
 *
 *
 ********************************** */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/style/buttons/Button';
import styles from './Modals.style';

const { func, shape, string } = PropTypes;

const SubmitReplyFeedbackModal = (props) => {
  const {
    modalActions, message, updateQuestionsList, title, doneButtonLabel,
  } = props;

  return (
    <form className="root">
      <div className="title">{title}</div>
      <div className="prompt-text" dangerouslySetInnerHTML={{ __html: message }} />
      <div className="actions">
        <Button
          onClickEvent={() => {
            updateQuestionsList();
            modalActions.closeModal();
          }}
          text={doneButtonLabel}
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
