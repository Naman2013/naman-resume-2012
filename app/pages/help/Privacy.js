import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Help.scss';

class Privacy extends Component {
  render() {
    return (
      <div>
        <div className="help-page-header">
          <h1 className="help-page-title">Privacy</h1>
          <a href="#/about/contact" className="button btn-primary help-page-button">
            Contact Us
          </a>
        </div>
        <div className="help-page-inner">
          <div className="help-page-section">

            <div className="help-page-title help-page-paragraph">
              Slooh Privacy Policy
            </div>
            <div className="help-page-paragraph">
              No financial transactions or sensitive financial data are ever stored on slooh.com servers. All financial exchanges occur on secure, SSL protected servers. When users submit sensitive information via the website, your information is protected both online and off-line.
            </div>

            <div className="help-page-title help-page-paragraph">
              Email Addresses:
            </div>
            <div className="help-page-paragraph">
              We may collect your email address when you (i) choose to send us an email message, (ii) purchase one of our products. We may use your email address to respond to your inquiry and to communicate with you when necessary to provide customer service and/or follow-up information related to a product purchase or shipping information. In addition, we may email you occasionally to notify you of special offers or unique opportunities within Slooh.com.
            </div>

            <div className="help-page-title help-page-paragraph">
              Postal Addresses:
            </div>
            <div className="help-page-paragraph">
              We may collect your postal address when you (i) choose to fill out one of our online forms to request information about our products and services, or (ii) purchase one of our products. We may use your postal address to respond to your inquiry and to communicate with you when necessary to provide customer service and/or follow-up information related to a product purchase or shipping information.
            </div>

            <div className="help-page-title help-page-paragraph">
              Telephone Numbers:
            </div>
            <div className="help-page-paragraph">
              We may collect your telephone number when you (i) request that we contact you by telephone, or (ii) choose to fill out one of our online forms to request information about our products and services, or (iii) purchase one of our products and we need to communicate with you about billing or shipping information.
            </div>

            <div className="help-page-title help-page-paragraph">
              We do not sell or rent customer information to third parties.
            </div>
            <div className="help-page-paragraph">
              {`As you browse our website, advertising cookies will be placed on your computer so that we can understand what you are interested in. Our display advertising partner, AdRoll, then enables us to present you with retargeting advertising on other sites based on your previous interaction with Slooh. The techniques our partners employ do not collect personal information such as your name, email address, postal address, or telephone number. You can visit <a href="http://www.networkadvertising.org/choices/" target="_new">this page</a> to opt out of AdRoll’s and their partners’ targeted advertising.`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Privacy;
