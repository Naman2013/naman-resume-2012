import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Button from 'components/common/style/buttons/Button';
import styles from './form-feedback-actions.style';
import messages from './form-feedback-actions.messages';

const { func } = PropTypes;
const FormFeedbackActions = (props) => {
  const { closeResponseFeedback, resetForm, intl } = props;
  return (
    <div className="root">
      <Button
        onClickEvent={closeResponseFeedback}
        text={intl.formatMessage(messages.goBackToHub)}
      />
      <style jsx>{styles}</style>
    </div>
  );
};

FormFeedbackActions.propTypes = {
  closeResponseFeedback: func.isRequired,
  resetForm: func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(FormFeedbackActions);
