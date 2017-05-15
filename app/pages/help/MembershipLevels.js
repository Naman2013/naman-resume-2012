import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Help.scss';

class MembershipLevels extends Component {
  render() {
    return (
      <div>
        <div className="help-page-header">
          <h1 className="help-page-title">Membership Levels</h1>
          <a href="#/about/contact" className="button btn-primary help-page-button">
            Contact Us
          </a>
        </div>
        <div className="help-page-inner">
          <div className="help-page-section">
            <div className="help-page-paragraph">
              <strong>Slooh Apprentice</strong> - entry level product, designed for beginners and students, costs $4.95 per month with a 30 day free trial, providing a curated experience to point the telescopes at any of the Slooh 500, the most popular objects in the night sky. Plus 24 hour access to the Space Situation Room. <strong><a href="https://saturn.slooh.com/join.php?type=a">Buy Now</a></strong>
            </div>
            <div className="help-page-paragraph">
              <strong>Slooh Astronomer</strong> - {'appropriate for more advanced amateur astronomers, costs $24.95 per month and features the ability to point any of Slooh\'s telescopes on an unlimited basis at any object in the sky, either by choosing from existing astronomical catalogs or by entering coordinates. Plus 24 hour access to the Space Situation Room. '}
              <strong><a href="https://saturn.slooh.com/join.php?type=c">Buy Now</a></strong>
            </div>
            <div className="help-page-paragraph">
              Want to build your mind’s eye a bit more before looking through the telescopes? <strong><a href="https://saturn.slooh.com/join.php?type=s">Register</a></strong> as <strong>Slooh Crew</strong> to see, share and comment in the community sections of the website.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MembershipLevels;
