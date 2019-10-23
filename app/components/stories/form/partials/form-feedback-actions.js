import React from 'react';
import PropTypes from 'prop-types';
import Button from 'app/components/common/style/buttons/Button';
import styles from './form-feedback-actions.style';


const { func, string } = PropTypes;
const FormFeedbackActions = props => {
  const { closeResponseFeedback, submitButtonCaption } = props;
  return (
    <div className="root">
      <Button onClickEvent={closeResponseFeedback} text={submitButtonCaption} />
      <style jsx>{styles}</style>
    </div>
  );
};

FormFeedbackActions.propTypes = {
  closeResponseFeedback: func.isRequired,
  resetForm: func.isRequired,

  submitButtonCaption: string,
};

FormFeedbackActions.defaultProps = {
  submitButtonCaption: 'OK',
};

export default FormFeedbackActions;
