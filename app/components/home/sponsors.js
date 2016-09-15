import React, { Component, PropTypes } from 'react';

class Sponsors extends Component {
  generateSponsors() {
    return this.props.sponsorImages
      .map((sponsorImage) => (
        <li className="sponsor-image">
          <img className="sponsor-image" src={sponsorImage} />
        </li>
      ));
  }

  render() {
    return(
      <div className="sponsor-images-container">
        <ul className="sponsor-images">
          {this.generateSponsors()}
        </ul>
      </div>
    );
  }
}

export default Sponsors;
