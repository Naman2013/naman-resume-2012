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


const RequestGroupFormFeedback = ({
  closeForm,
  requestNew,
  promptText,
}) => (
  <form className="root">
    <div className="title">Request a group</div>
    <div className="prompt-text" dangerouslySetInnerHTML={{ __html: promptText }} />
    <div className="actions">
      <Button onClickEvent={closeForm} text="Cancel" />
      <Button onClickEvent={requestNew} text="Request Another Group" />
    </div>
    <style jsx>{styles}</style>
  </form>
);

RequestGroupFormFeedback.propTypes = {
  closeForm: func.isRequired,
  requestNew: func.isRequired,
  promptText: string.isRequired,
}
export default RequestGroupFormFeedback;
