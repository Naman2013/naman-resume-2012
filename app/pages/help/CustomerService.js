import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Help.scss';

class CustomerService extends Component {
  render() {
    return (
      <div>
        <div className="help-page-header">
          <h1 className="help-page-title">Contact Customer Service</h1>
          <a href="#/about/contact" className="button btn-primary help-page-button">
            Contact Us
          </a>
        </div>
        <div className="help-page-inner">
          <div className="help-page-section">
            <div className="help-page-paragraph">
              If you have questions about Slooh or any of our membership plans, please email us at <a href="mailto:friend@slooh.com">friend@slooh.com</a> or click <a href="#/about/contact">here</a>.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerService;
