import React from 'react';
import { Link } from 'react-router';
import './Help.scss';

const SiteFeedback = () => (
  <div>
    <div className="help-page-header">
      <h1 className="help-page-title">Site Feedback</h1>
    </div>
    <div className="help-page-inner">
      <div className="help-page-section">
        <div className="help-page-paragraph">
          We welcome your feedback as we strive to improve the user experience. Please submit your thoughts to <a href="mailto:support@slooh.com">support@slooh.com</a>
        </div>
      </div>
    </div>
  </div>
);

export default SiteFeedback;
