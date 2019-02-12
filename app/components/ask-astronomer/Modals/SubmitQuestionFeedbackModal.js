/***********************************
* V4 Submit Answer Feedback Modal
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import noop from 'lodash/noop';
import Button from 'components/common/style/buttons/Button';
import styles from './Modals.style';

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

const SubmitQuestionFeedback = (props) => {
  const {
    modalActions,
    promptText,
    requestQuestion,
    title,
    doneButtonLabel,
    continueButtonLabel,
    updateQuestionsList
  } = props;
  return (
    <form className="root">
      <div className="title" dangerouslySetInnerHTML={{ __html: title}} />
      <div className="prompt-text" dangerouslySetInnerHTML={{ __html: promptText}} />
      <div className="actions">
        <Button
          onClickEvent={() => {
            updateQuestionsList();
            modalActions.closeModal();
          }}
          text={doneButtonLabel}
          theme={{ marginRight: '10px' }}
        />
        <Button onClickEvent={requestQuestion} text={continueButtonLabel} />
      </div>
      <style jsx>{styles}</style>
    </form>

  );
};

SubmitQuestionFeedback.propTypes = {
  modalActions: shape({
    closeModal: func,
    setModal: func,
    showModal: func,
  }).isRequired,
  promptText: string,
  requestQuestion: func,
  updateQuestionsList: func.isRequired,
};

SubmitQuestionFeedback.defaultProps = {
  requestQuestion: noop,
  promptText: '',
};

export default SubmitQuestionFeedback;
