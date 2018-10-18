/***********************************
* V4 Request Group Form Feedback Screen
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/style/buttons/Button';
import styles from './request-group-form.style';

const {
  func,
  string,
} = PropTypes;


const PromptWithClose = ({
  closeForm,
  promptText,
}) => (
  <form className="root">
    <div className="prompt-text" dangerouslySetInnerHTML={{ __html: promptText }} />
    <div className="actions">
      <Button onClickEvent={closeForm} text="Cancel" />
    </div>
    <style jsx>{styles}</style>
  </form>
);

PromptWithClose.propTypes = {
  closeForm: func.isRequired,
  promptText: string.isRequired,
}
export default PromptWithClose;
