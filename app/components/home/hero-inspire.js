/**
  hero inspire
  second generation of the hero for the home page
  this version introduces a video background to sit behind the primary
  call to action
  */
import React, { Component } from 'react';
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

  renderCallToActionJoinOrEvent() {
    const { heroButtonText, registerNewMemberURL, userLoggedInFlag } = this.props;
    if (!userLoggedInFlag) {
      return <a className="action" href={registerNewMemberURL}>{heroButtonText}</a>;
    }

    return '';

    // return buttonUrl === '/join.php?type=r' ?
    //   <a className="action" href={registerNewMemberURL}>{heroButtonText}</a> :
    //   // <Link className="action" to={buttonUrl}>{heroButtonText}</Link>
    //   // New
    //   <a className="action" onClick={() => this.openModal()}> Watch Video Tour </a>
  }


  renderCallToActionWatchTour(buttonUrl) {
    const { heroButtonText, registerNewMemberURL, showVideoTourButton, videoTourText } = this.props;
    // considered temporary HAXXX
    // const URLIsExternal = isExternalURL(buttonUrl);
    if (showVideoTourButton === true && videoTourText) {
      return <a className="action" onClick={() => this.openModal()}>{videoTourText}</a>
    }
  }


  render() {
    const {
      heroHeadline,
      heroSubheadline,
      heroButtonText,
      heroButtonURL,
      heroEventIsLive,
      heroEventId,
      showHeroButton,
      showVideoTourButton,
      videoTourText,
      videoTourURL,
      userLoggedInFlag,
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


    const buttonUrl = {
      // this should be videoUrl: videoTourURL
      // but videoTourURL is currently a malformed youtube link
      // awaiting update from richard
      videoUrl: videoTourURL,
    };

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
          bg={'black'}
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

          <img className="divider-image" alt="" src="https://vega.slooh.com/assets/icons/three-amigos-with-bar.svg" />

          <div className="call-to-action">
            {
              eventButtonUrl && showHeroButton ?
                this.renderCallToActionJoinOrEvent(eventButtonUrl) :
                <div />
            }
          </div>
          <div className="call-to-action">
            {
              buttonUrl && showVideoTourButton ?
                this.renderCallToActionWatchTour(buttonUrl) :
                <div />
            }
          </div>
        </div>

        <ScrollForMore />
        <style>{`
          img.divider-image {
            margin-right: 4px;
          }
          @media(max-width:640px){
           img.divider-image { display:block; margin:0px auto}
          }
          @media(max-width:675px){
          .hero-container-inspire{padding:0px 10px}

          }

          div.call-to-action {
            display: inline-block;
            margin-top: 20px;
            margin-bottom: 20px;
            margin-right: 10px;
          }
          a.action {
            width: 215px;
          }
            @media(max-width:375px){
            div.call-to-action {display:block; margin:20px auto}
            div.call-to-action a.action{margin:0px auto}
          }
          `}
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
  videoTourText: PropTypes.string.isRequired,
  videoTourURL: PropTypes.string.isRequired,
  userLoggedInFlag: PropTypes.bool.isRequired,
  showHeroButton: PropTypes.bool.isRequired,
  showVideoTourButton: PropTypes.bool.isRequired,
};

export default HeroInspire;
