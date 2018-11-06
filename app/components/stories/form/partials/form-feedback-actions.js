import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/style/buttons/Button';
import styles from './form-feedback-actions.style';

const { func } = PropTypes;
const FormFeedbackActions = (props) => {
  const {
    closeResponseFeedback,
    resetForm,
  } = props
  return (
    <div className="root">
      <Button onClickEvent={closeResponseFeedback} text="Go Back to Stories Hub" />
      <style jsx>{styles}</style>
    </div>
  );
};

FormFeedbackActions.propTypes = {
  closeResponseFeedback: func.isRequired,
  resetForm: func.isRequired,
};


export default FormFeedbackActions;
