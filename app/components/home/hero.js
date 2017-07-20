import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import isExternalURL from '../../utils/is-external-url';
import style from './hero.scss';
import ScrollForMore from '../common/scroll-for-more';

import ModalGeneric from '../common/modals/modal-generic';
import VideoModal from './video-modal';

const mapStateToProps = ({ appConfig }) => ({
  registerNewMemberURL: appConfig.registerNewMemberURL,
});

@connect(mapStateToProps)
class Hero extends Component {
  state = {
    modalOpen: false,
  };
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
    console.log("buttonUrl: ", buttonUrl);
    return buttonUrl === '/join.php?type=r' ?
      <a className="action" href={registerNewMemberURL}>{heroButtonText}</a> :
      buttonUrl.videoUrl ?
      <a className="action" onClick={() => this.openModal()}> Watch Video Tour </a> :
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

    const tourButtonUrl = {
      videoUrl: 'https://www.youtube.com/embed/NtlEhGk-tSk',
    };

    return (
      <div
        style={heroContainerStyle}
        className="hero-container"
      >

        <ModalGeneric
          open={this.state.modalOpen}
          closeModal={this.closeModal}
          title={''}
          description={<VideoModal {...tourButtonUrl} />}
        />

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
        <div className="call-to-action">
          {
            tourButtonUrl ?
              this.renderCallToAction(tourButtonUrl) :
              <div style={{ width: '100px', height: '100px' }} />
          }
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
