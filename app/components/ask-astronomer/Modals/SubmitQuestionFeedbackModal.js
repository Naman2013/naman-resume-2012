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

const SubmitQuestionFeedback = (props) => {
  const {
    modalActions,
    promptText,
    requestQuestion,
  } = props;

  return (
    <div className="root" key={uniqueId()}>
      <form className="root">
        <div className="title">Ask an Astronomer</div>
        <div className="prompt-text" dangerouslySetInnerHTML={{ __html: promptText}} />
        <div className="actions">
          <Button onClickEvent={modalActions.closeModal} text="Done" />
          <Button onClickEvent={requestQuestion} text="Ask Another Question" />
        </div>
        <style jsx>{styles}</style>
      </form>
      <style jsx>{styles}</style>
    </div>
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

};

SubmitQuestionFeedback.defaultProps = {
  requestQuestion: noop,
  promptText: '',
};

export default SubmitQuestionFeedback;
