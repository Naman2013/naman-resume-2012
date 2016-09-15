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
        <h3 className="title">{this.props.title}</h3>
        <ul className="sponsor-images">
          {this.generateSponsors()}
        </ul>
      </div>
    );
  }
}

Sponsors.propTypes = {
  title: PropTypes.string,
  sponsorImages: PropTypes.array
};

export default Sponsors;
