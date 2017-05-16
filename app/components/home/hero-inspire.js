/**
  hero inspire
  second generation of the hero for the home page
  this version introduces a video background to sit behind the primary
  call to action
  */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './hero.scss';

import ScrollForMore from '../common/scroll-for-more';

function HeroInspire({
  heroEventId,
  heroEventIsLive,
  heroImageURL,
  heroHeadline,
  heroSubheadline,
  heroFactoidText,
  heroFactoidIconURL,
  heroButtonText,
  heroButtonURL,
}) {
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
            <Link className="action" to={buttonUrl}>
              {heroButtonText}
            </Link> : <div style={{ width: '100px', height: '100px' }} />
        }
      </div>

      <ScrollForMore />
    </div>
  );
}

HeroInspire.propTypes = {
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
