/**
  hero inspire
  second generation of the hero for the home page
  this version introduces a video background to sit behind the primary
  call to action
  */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './hero-inspire.scss';

import ScrollForMore from '../common/scroll-for-more';
import isMobileScreenSize from '../../utils/content-loading-conditions';

import ModalGeneric from '../common/modals/modal-generic';
import VideoModal from './video-modal';


const mapStateToProps = ({ appConfig }) => ({
  registerNewMemberURL: appConfig.registerNewMemberURL,
});

@connect(mapStateToProps)
class HeroInspire extends Component {
  state = {
    videoLoaded: false,
    // New
    modalOpen: false,
  };

  componentDidMount() {
    const video = window.document.getElementById('heroInspireVideoBackground');
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

  // New
  closeModal = (event) => {
    event.preventDefault();

    this.setState({
      modalOpen: false,
    });
  }

  // New
  openModal(modalContent) {
    this.setState({
      ...modalContent,
      modalOpen: true,
    });
  }


  renderCallToAction(buttonUrl) {
    const { heroButtonText, registerNewMemberURL } = this.props;
    // considered temporary HAXXX
    // const URLIsExternal = isExternalURL(buttonUrl);
    console.log('heroButtonText: ', heroButtonText);
    return buttonUrl === '/join.php?type=r' ?
      <a className="action" href={registerNewMemberURL}>{heroButtonText}</a> :
      // <Link className="action" to={buttonUrl}>{heroButtonText}</Link>
      // New
      <a className="action" onClick={() => this.openModal()}> Watch Video Tour </a>
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

    // Old
    const eventButtonUrl = heroEventId === 0 ? heroButtonURL :
      // construct link for space situation room
      heroEventIsLive ? '/shows/situation-room' :
      // construct link for video event page
      `/shows/event-details/${heroEventId}`;

    // New
    // const buttonUrl = 'https://www.youtube.com/embed/NtlEhGk-tSk&amp;showinfo=0';
    const buttonUrl = {
      videoUrl: 'https://www.youtube.com/embed/NtlEhGk-tSk',
    };
    // const heroButtonText = 'Watch Video Tour';

    return (
      <div
        style={heroContainerStyle}
        className="hero-container-inspire"
      >

        <ModalGeneric
          open={this.state.modalOpen}
          closeModal={this.closeModal}
          title={''}
          description={<VideoModal {...buttonUrl} />}
        />

        {
          isMobileScreenSize() ?
            <div className={`${style.videoBackground} ${style.staticImageBackground} ${style.maxOpacity}`} /> :
            <video id="heroInspireVideoBackground" className={videoClassnames} playsInline autoPlay muted loop>
              <source src="https://vega.slooh.com/video/home/stars-high-720.webm" type="video/webm" />
              <source src="https://vega.slooh.com/video/home/stars-high-720.mp4" type="video/mp4" />
            </video>
        }

        <div className={style.contentContainer}>
          <h2 className="title" dangerouslySetInnerHTML={{ __html: heroHeadline }} />
          <h3 className="sub-title">{heroSubheadline}</h3>

          <img className={style.iconSpacer} alt="" src="assets/icons/three-amigos-with-bar.svg" />

          <div className="call-to-action">
            {
              buttonUrl ?
                this.renderCallToAction(eventButtonUrl) :
                <div style={{ width: '100px', height: '100px' }} />
            }
          </div>
          <div className="call-to-action">
            {
              buttonUrl ?
                this.renderCallToAction(buttonUrl) :
                <div style={{ width: '100px', height: '100px' }} />
            }
          </div>
        </div>

        <ScrollForMore />
        <style>{`
          div.call-to-action {
            display: inline-block;
            margin-left: 10px;
            margin-top: 20px;
            margin-bottom: 20px;
          }`}
        </style>
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
