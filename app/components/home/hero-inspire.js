/**
  hero inspire
  second generation of the hero for the home page
  this version introduces a video background to sit behind the primary
  call to action
  */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import style from './hero-inspire.scss';

import ScrollForMore from '../common/scroll-for-more';

class HeroInspire extends Component {
  state = {
    videoLoaded: false,
  };

  componentDidMount() {
    this.videoRenderedTimer = setInterval(() => {
      const video = document.getElementById('heroInspireVideoBackground');
      if (video.readyState === 4) {
        this.setState({
          videoLoaded: true,
        });
        clearInterval(this.videoRenderedTimer);
      }
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.videoRenderedTimer);
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

    const { videoLoaded } = this.state;

    const heroContainerStyle = {
      background: 'black',
    };

    const videoClassnames = classnames(`${style.videoBackground}`, {
      maxOpacity: videoLoaded,
    });

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
        <video id="heroInspireVideoBackground" className={videoClassnames} playsinline autoPlay muted>
          <source src="assets/video/stars-high-720.webm" type="video/webm" />
          <source src="assets/video/stars-high-720.mp4" type="video/mp4" />
        </video>

        <div className={style.contentContainer}>
          <h2 className="title">Space for everyone</h2>
          <h3 className="sub-title">Online Telescopes, LIVE Streaming Events, Original Video Programming, and more.</h3>

          <img className={style.iconSpacer} alt="" src="assets/icons/three-amigos-with-bar.svg" />

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
