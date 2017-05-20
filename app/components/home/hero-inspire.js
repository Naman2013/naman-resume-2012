/**
  hero inspire
  second generation of the hero for the home page
  this version introduces a video background to sit behind the primary
  call to action
  */
import React, { Component } from 'react';
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './hero-inspire.scss';

import ScrollForMore from '../common/scroll-for-more';
import isMobileScreenSize from '../../utils/content-loading-conditions';
import isExternalURL from '../../utils/is-external-url';

class HeroInspire extends Component {
  state = {
    videoLoaded: false,
  };

  componentDidMount() {
    const video = document.getElementById('heroInspireVideoBackground');
    if (video !== null) {
      this.videoRenderedTimer = setInterval(() => {
        if (video.readyState === 4) {
          this.setState({
            videoLoaded: true,
          });
          clearInterval(this.videoRenderedTimer);
        }
      }, 500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.videoRenderedTimer);
  }

  videoRenderedTimer = null;

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
      heroHeadline,
      heroSubheadline,
      heroButtonText,
      heroButtonURL,
      heroEventIsLive,
      heroEventId,
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

        {
          isMobileScreenSize() ?
            <div className={`${style.videoBackground} ${style.staticImageBackground} ${style.maxOpacity}`} /> :
            <video id="heroInspireVideoBackground" className={videoClassnames} playsInline autoPlay muted>
              <source src="assets/video/stars-high-720.webm" type="video/webm" />
              <source src="assets/video/stars-high-720.mp4" type="video/mp4" />
            </video>
        }

        <div className={style.contentContainer}>
          <h2 className="title">{heroHeadline}</h2>
          <h3 className="sub-title">{heroSubheadline}</h3>

          <img className={style.iconSpacer} alt="" src="assets/icons/three-amigos-with-bar.svg" />

          <div className="call-to-action">
            {
              buttonUrl ?
                this.renderCallToAction(buttonUrl) :
                <div style={{ width: '100px', height: '100px' }} />
            }
          </div>
        </div>

        <ScrollForMore />
      </div>
    );
  }
}

HeroInspire.propTypes = {
  heroHeadline: PropTypes.string.isRequired,
  heroSubheadline: PropTypes.string.isRequired,
  heroButtonText: PropTypes.string.isRequired,
  heroButtonURL: PropTypes.string.isRequired,
};

export default HeroInspire;
