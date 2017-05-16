/**
  hero inspire
  second generation of the hero for the home page
  this version introduces a video background to sit behind the primary
  call to action
  */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './hero-inspire.scss';

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
      className="hero-container-inspire"
    >
      <video className={style.videoBackground} playsinline autoPlay muted loop>
        <source src="assets/video/stars-high-720.webm" type="video/webm" />
        <source src="assets/video/stars-high-720.mp4" type="video/mp4" />
      </video>

      <div className={style.contentContainer}>
        <h2 className="title">Space for everyone</h2>
        <h3 className="sub-title">Online Telescopes, LIVE Streaming Events, Original Video Programming, and more.</h3>

        <div className="call-to-action">
          <Link className="action" to="/">
            Register Free Today
          </Link>
        </div>
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

export default HeroInspire;
