import React, { PropTypes } from 'react';
import s from './FormErrorMessage.scss';

const FormErrorMessage = ({ messageTitle, messageBody }) => (
  <div className={`${s.formErrorMessageRoot} form-error-message`}>
    <h5>{messageTitle}</h5>
    <p>{messageBody}</p>
  </div>
);

FormErrorMessage.defaultProps = {
  messageTitle: 'Error!',
  messageBody: 'Seems like something went wrong.',
};

FormErrorMessage.propTypes = {
  messageTitle: PropTypes.string,
  messageBody: PropTypes.string,
};

export default FormErrorMessage;
