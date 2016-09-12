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

        <h2 className="title">{this.props.mainHeadingText}</h2>
        <h3 className="sub-title">{this.props.subHeadingText}</h3>

        <div className="fun-fact-container">
          <figure>
            <img width="50" src={this.props.funFactImage} />
            <figcaption className="fun-fact-text">
              <i>{this.props.funFactText}</i>
            </figcaption>
          </figure>
        </div>

        <div className="call-to-action">
          <a className="action" href={this.props.actionUrl}>
            {this.props.actionText}
          </a>
        </div>

        <div className="read-more-container">
          <button className="read-more">
            Scroll for more
            <br />
            <span className="glyphicon glyphicon-chevron-down"></span>
          </button>
        </div>

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
