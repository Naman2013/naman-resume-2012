import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './target-validation-form.scss';

class TargetValidationForm extends Component {
  render() {
    const {
      handleVisibilityCheck,
      handleTargetChange,
      visibilityStatusExplanation,
      checkVisibilityEnabled,
      targetName
    } = this.props;

    const buttonClasses = classnames('btn-primary', {
      'disabled': !checkVisibilityEnabled,
    });

    return(
      <div className="target-validation-form">
        <h3 className="title">Target Name (optional):</h3>
        <div>
          <input
            value={targetName}
            onChange={handleTargetChange}
            className="generic-text-input col-xs-12"
            type="text"
          />
        </div>

        <button
          onClick={handleVisibilityCheck}
          className={buttonClasses}>Check Visibility</button>

        {
          visibilityStatusExplanation ?
            <p className="validation-message">{visibilityStatusExplanation}</p> : null
        }
      </div>
    );
  }
}

const { string, number, bool, func } = PropTypes;
TargetValidationForm.propTypes = {
  targetName: string,
  visibilityStatusExplanation: string,
  handleVisibilityCheck: func.isRequired,
  handleTargetChange: func.isRequired,
  checkVisibilityEnabled: bool.isRequired,
};

export default TargetValidationForm;
