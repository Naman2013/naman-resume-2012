import React, { Component, PropTypes } from 'react';
import style from './hero.scss';

class Hero extends Component {
  render() {

    const heroContainerStyle = {
      background: `url(${this.props.backgroundImageUrl}) no-repeat center center`,
      backgroundSize: 'cover'
    };

    return(
      <div
        style={heroContainerStyle}
        className="hero-container">

      </div>
    );
  }
}

Hero.propTypes = {
  backgroundImageUrl: PropTypes.string,
  mainHeadingText: PropTypes.string,
  subHeadingText: PropTypes.string,
  funFactImage: PropTypes.string,
  funFactText: PropTypes.string,
  actionUrl: PropTypes.string,
  actionText: PropTypes.string,
};

export default Hero;
