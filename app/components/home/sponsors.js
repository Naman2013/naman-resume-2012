import React, { Component, PropTypes } from 'react';
import style from './sponsors.scss';

class Sponsors extends Component {
  generateSponsors() {
    return this.props.sponsorImages
      .map((sponsorImage) => {
        const imageStyle = {
          background: `url(${sponsorImage.imageUrl}) no-repeat center center`,
          backgroundSize: sponsorImage.size
        };
        return(
          <li
            style={imageStyle}
            className={style.sponsorImage}>
          </li>
        );
      });
  }

  render() {
    return(
      <div className={style.sponsorImagesContainer}>
        <h3 className={style.title}>{this.props.title}</h3>
        <ul className="sponsor-images clearfix">
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
