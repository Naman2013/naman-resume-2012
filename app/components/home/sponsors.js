import React, { Component, PropTypes } from 'react';
import style from './sponsors.scss';

class Sponsors extends Component {
  generateSponsors() {
    return this.props.sponsorImages
      .map((sponsorImage) => (
        <li className="sponsor-image">
          <img className={style.sponsorImage} src={sponsorImage} />
        </li>
      ));
  }

  render() {
    return(
      <div className={style.sponsorImagesContainer}>
        <h3 className={style.title}>{this.props.title}</h3>
        <ul className={style.sponsorImages}>
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
