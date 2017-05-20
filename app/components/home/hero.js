import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import isExternalURL from '../../utils/is-external-url';
import style from './hero.scss';
import ScrollForMore from '../common/scroll-for-more';

class Hero extends Component {
  renderCallToAction(buttonUrl) {
    const { heroButtonText } = this.props;
    // considered temporary HAXXX
    // const URLIsExternal = isExternalURL(buttonUrl);
    return buttonUrl === '/join.php?type=r' ?
      <a className="action" href={`${window.location.hostname}${buttonUrl}`}>{heroButtonText}</a> :
      <Link className="action" to={buttonUrl}>{heroButtonText}</Link>
  }

  render() {
    const {
      heroEventId,
      heroEventIsLive,
      heroImageURL,
      heroHeadline,
      heroSubheadline,
      heroFactoidText,
      heroFactoidIconURL,
      heroButtonText,
      heroButtonURL,
    } = this.props;

    const heroContainerStyle = {
      background: `url(${heroImageURL}) center/cover no-repeat`,
    };

    const buttonUrl = heroEventId === 0 ? heroButtonURL :
      // construct link for space situation room
      heroEventIsLive ? '/shows/situation-room' :
      // construct link for video event page
      `/shows/event-details/${heroEventId}`;

    return (
      <div
        style={heroContainerStyle}
        className="hero-container"
      >

        <h2 className="title">{heroHeadline}</h2>
        <h3 className="sub-title">{heroSubheadline}</h3>

        <div className="fun-fact-container">
          <figure>
            {heroFactoidIconURL ? <img alt="" width="50" src={heroFactoidIconURL} /> : null}
            {heroFactoidText ? <figcaption className="fun-fact-text">
              <i>{heroFactoidText}</i>
            </figcaption> : null}
          </figure>
        </div>

        <div className="call-to-action">
          {
            buttonUrl ?
              this.renderCallToAction(buttonUrl) :
              <div style={{ width: '100px', height: '100px' }} />
          }
        </div>

        <ScrollForMore />
      </div>
    );
  }
}

Hero.propTypes = {
  heroEventId: PropTypes.number,
  heroEventIsLive: PropTypes.bool,
  heroImageURL: PropTypes.string,
  heroHeadline: PropTypes.string,
  heroSubheadline: PropTypes.string,
  heroFactoidText: PropTypes.string,
  heroFactoidIconURL: PropTypes.string,
  heroButtonText: PropTypes.string,
  heroButtonURL: PropTypes.string,
};

export default Hero;
