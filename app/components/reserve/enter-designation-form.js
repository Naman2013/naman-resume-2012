import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './enter-designation-form.scss';

class EnterDesignationForm extends Component {
  componentDidMount() {
    this.focusDesignationInput();
  }

  componentWillUpdate() {
    this.focusDesignationInput();
  }

  focusDesignationInput() {
    this.designationInput.focus();
  }

  render() {
    const { visibilityStatusExplanation } = this.props;

    const {
      exampleFormat,
      example,
      designation,
      designationChangeCallback,
      checkVisibilityEnabled,
      handleVisibilityCheck } = this.props;

    const buttonClasses = classnames('btn-primary', {
      disabled: !checkVisibilityEnabled,
    });

    return (
      <div className="enter-designation-form">
        <h3 className="title">Format:</h3>
        <p className="copy">{exampleFormat}</p>

        <h3 className="title">Example:</h3>
        <p className="copy">{example}</p>

        <h3 className="title">Designation:</h3>
        <input
          ref={(input) => { this.designationInput = input }}
          onChange={designationChangeCallback}
          value={designation}
          className="generic-text-input" type="text"
        />

        <button
          onClick={handleVisibilityCheck}
          className={buttonClasses}
        >
          Check Visibility
        </button>

        {
          visibilityStatusExplanation ?
            <p className="validation-message">{visibilityStatusExplanation}</p> : null
        }
      </div>
    );
  }
}

const { string, number, bool, func } = PropTypes;
EnterDesignationForm.propTypes = {
  exampleFormat: string.isRequired,
  example: string.isRequired,
  designation: string.isRequired,
  designationChangeCallback: func.isRequired,
  checkVisibilityEnabled: bool.isRequired,
  handleVisibilityCheck: func.isRequired,
  visibilityStatusExplanation: string,
};

export default EnterDesignationForm;
