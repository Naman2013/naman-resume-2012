import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Help.scss';

class Community extends Component {
  render() {
    return (
      <div>
        <div className="help-page-header">
          <h1 className="help-page-title">Community</h1>
          <a href="#/about/contact" className="button btn-primary help-page-button">
            Contact Us
          </a>
        </div>
        <div className="help-page-inner">
          <div className="help-page-section">
            <div className="help-page-paragraph">We’ve curated a catalog of the most popular objects in the sky which we call the Slooh 500. In the spirit of community, while you are looking at any of these objects through a Slooh telescope, we will share posts about that particular object as made by members of the community. Slooh curates these posts, and true to our mission, welcomes diverse perspectives about what is 'out there', knowing that no one interpretation can ever be definitive. Slooh is open to the spiritual, the artistic, the imaginative, along with the scientific. We will recognize and reward members of the community who make the most popular posts. All posts are freely available to the public, who are invited to participate in the community as well.</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Community;
