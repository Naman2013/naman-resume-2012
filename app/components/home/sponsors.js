import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './sponsors.scss';

class Sponsors extends Component {
  generateSponsors() {
    return this.props.sponsorImages
      .map((sponsorImage, index) => {
        const imageStyle = {
          background: `url(${sponsorImage.imageUrl}) no-repeat center center`,
          backgroundSize: `${sponsorImage.size}`,
          minWidth: 'auto',
        };
        return(
          <li
            key={index}
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
