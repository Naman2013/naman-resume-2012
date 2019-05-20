/***********************************
 * V4 Submit Answer Feedback Modal
 *
 *
 *
 ***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.style';

const { func, string } = PropTypes;

const Modal = props => {
  const { promptText, renderActions, title } = props;
  return (
    <form className="root">
      <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
      <div
        className="prompt-text"
        dangerouslySetInnerHTML={{ __html: promptText }}
      />
      <div className="actions">{renderActions()}</div>
      <style jsx>{styles}</style>
    </form>
  );
};

Modal.propTypes = {
  renderActions: func.isRequired,
  promptText: string,
  title: string,
};

Modal.defaultProps = {
  promptText: '',
  title: '',
};

export default Modal;
