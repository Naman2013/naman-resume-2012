import React, { Component, PropTypes } from 'react';
import style from './enter-designation-form.scss';

class EnterDesignationForm extends Component {
  render() {
    return(
      <div className="enter-designation-form">
        <h3 className="title">Format:</h3>
        <p className="copy">1 to 4076 (main catalog), 1S to 1174S</p>

        <h3 className="title">Example:</h3>
        <p className="copy">603S</p>

        <h3 className="title">Designation:</h3>
        <input className="generic-text-input" type="text" />

        <button className="btn-primary">Verify Availability</button>

        <p className="validation-message">Good news! This object is currently visible.</p>
      </div>
    );
  }
}

export default EnterDesignationForm;
