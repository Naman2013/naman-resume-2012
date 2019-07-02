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
          For Account Queries, please contact <a href="mailto:custserv@slooh.com">custserv@slooh.com</a>.
        </div>
      </div>
      <div className="help-page-section">
        <div className="help-page-paragraph">
          For Technical Support, please contact <a href="mailto:support@slooh.com">support@slooh.com</a>.
        </div>
      </div>
    </div>
  </div>
);


export default CustomerService;