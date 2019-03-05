import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import Button from 'components/common/style/buttons/Button';
import styles from './form-feedback-actions.style';
import messages from './form-feedback-actions.messages';

const { func, string } = PropTypes;
const FormFeedbackActions = (props) => {
  const { closeResponseFeedback, submitButtonCaption } = props;
  return (
    <div className="root">
      <Button
        onClickEvent={closeResponseFeedback}
        text={submitButtonCaption}
      />
      <style jsx>{styles}</style>
    </div>
  );
};

FormFeedbackActions.propTypes = {
  closeResponseFeedback: func.isRequired,
  resetForm: func.isRequired,
  intl: intlShape.isRequired,
  submitButtonCaption: string,
};

FormFeedbackActions.defaultProps = {
  submitButtonCaption: 'OK',
};



export default FormFeedbackActions;
