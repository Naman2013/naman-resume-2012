/**
  hero inspire
  second generation of the hero for the home page
  this version introduces a video background to sit behind the primary
  call to action
  */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './hero-inspire.scss';

import ScrollForMore from '../common/scroll-for-more';
import isMobileScreenSize from '../../utils/content-loading-conditions';

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

  render() {
    const {
      heroHeadline,
      heroSubheadline,
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
            <a className="action" href={heroButtonText}>
              {heroButtonText}
            </a>
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
