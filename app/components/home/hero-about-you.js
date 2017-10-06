/**
  hero about you
  third generation of the hero for the home page
  this version introduces an info panel for a signed in user
  */
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GoogleAd from '../common/google-ads/GoogleAd';
import { profilePhotoStyle } from '../../styles/mixins/utilities';

const {
  string,
  number,
  shape,
  bool,
} = PropTypes;

const HeroAboutYou = ({
  // adHeight,
  // adWidth,
  avatarURL,
  campaignName,
  displayName,
  editLinkLabel,
  editLinkURL,
  membershipType,
  showAdFlag,
  showEditLinkFlag,
  userStats,
}) => (<div className="hero-about-you">
    <div className="info">
      <div className="user">
        <div className="avatar" style={profilePhotoStyle(avatarURL)} />
        <div className="user-info">
          <h2 dangerouslySetInnerHTML={{ __html: displayName }} />
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: membershipType }} />
            <Link to={`${editLinkURL}`}><h3 dangerouslySetInnerHTML={{ __html: editLinkLabel }} /></Link>
          </div>
        </div>
      </div>
      <div className="stats"></div>
    </div>
    {showAdFlag && <div className="ad">
      <GoogleAd
        adURL={'/5626790/Replay'}
        adWidth={300}
        adHeight={600}
        targetDivID={'div-gpt-ad-1495118239378-0'}
      />
    </div>}
    <style jsx>{`
      .hero-about-you {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .info {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: space-between;
      }
      .user {
        display: flex;
        flex-direction: row;
      }

      .avatar {
        background-repeat: no-repeat;
      }
      .ad {
        flex: 1;
      }
    `}</style>
  </div>);

HeroAboutYou.propTypes = {
  adHeight: number,
  adWidth: number,
  avatarURL: string,
  campaignName: string,
  displayName: string,
  editLinkLabel: string,
  editLinkURL: string,
  membershipType: string,
  showAdFlag: bool,
  showEditLinkFlag: bool,
  userStats: shape({
    Reservations: string,
    Testing: string,
  }),
};
HeroAboutYou.defaultProps = {
  adHeight: 300,
  adWidth: 250,
  avatarURL: '',
  campaignName: '',
  displayName: '',
  editLinkLabel: '',
  editLinkURL: '',
  membershipType: '',
  showAdFlag: false,
  showEditLinkFlag: false,
  userStats: {},
};

export default HeroAboutYou;
