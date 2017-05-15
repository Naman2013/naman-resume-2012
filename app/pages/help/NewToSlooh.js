import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Help.scss';

class NewToSlooh extends Component {
  render() {
    return (
      <div>
        <div className="help-page-header">
          <h1 className="help-page-title">New To Slooh</h1>
          <a href="#/about/contact" className="button btn-primary help-page-button">
            Contact Us
          </a>
        </div>
        <div className="help-page-inner">
          <div className="help-page-section">
            <div className="help-page-paragraph">Welcome! We know that space can seem rather daunting and boundless, so we’ve designed your adventure into the vast unknown to unfold in stages. For starters, while we may be alone in the Universe (who can really say?), you will never be alone at Slooh. Slooh is founded upon the principle that looking through telescopes is more interesting (and affordable!) as a social experience, and therefore you will find insights and support from the community every step of the way.</div>
            <div className="help-page-paragraph">We’ve situated large, robotic telescopes under the highest, darkest skies on Earth, so you can look up in wonder any time of day, even if it is cloudy where you live. And Slooh’s global telescope network provides coverage of space from around the world, monitored 24 hours a day by Slooh Astronomers and shared live with you.</div>
            <div className="help-page-paragraph">Slooh is space for everyone, which includes experiences for every level and budget. Go find yours!</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewToSlooh;
