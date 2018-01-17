import React from 'react';
import { Link } from 'react-router';
import './Help.scss';

const CustomerService = () => (
  <div>
    <div className="help-page-header">
      <h1 className="help-page-title">Contact Customer Service</h1>
    </div>
    <div className="help-page-inner">
      <div className="help-page-section">
        <div className="help-page-paragraph">
          If you have questions about Slooh or any of our membership plans,
          please email us at <a href="mailto:friend@slooh.com">friend@slooh.com</a>.
        </div>
      </div>
    </div>
  </div>
);


export default CustomerService;
