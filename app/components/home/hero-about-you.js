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
import { white, black, pink, lightBlack } from '../../styles/variables/colors';


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
          <h2 className="name" dangerouslySetInnerHTML={{ __html: displayName }} />
          <div>
            <h4 className="membership">
              <span
                className={classnames({ membershipType: showEditLinkFlag })}
                dangerouslySetInnerHTML={{ __html: membershipType }}
              />
              { showEditLinkFlag && <Link to={`${editLinkURL}`}>
                <span className="about-you-link" dangerouslySetInnerHTML={{ __html: editLinkLabel }} />
              </Link>}
            </h4>

          </div>
        </div>
      </div>
      <div className="stats">
        {Object.keys(userStats).map(statLabel => (<div className="stat">
          <span className="stat-label" dangerouslySetInnerHTML={{ __html: statLabel }} />
          <span className="stat-value" dangerouslySetInnerHTML={{ __html: userStats[statLabel] }} />
        </div>))}
      </div>
    </div>
    {showAdFlag && <div className="ad">
      <GoogleAd
        adURL={'/5626790/Recommends'}
        adWidth={300}
        adHeight={250}
        targetDivID={'div-gpt-ad-1495111021281-0'}
      />
    </div>}
    <style jsx>{`
      .hero-about-you {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        justify-content: space-between;
        background-color: ${black};
        color: ${white};
        padding: 25px 50px;
        min-height: 300px;
      }
      .info {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: space-between;
        flex-wrap: wrap;
        -ms-flex-wrap: wrap;
      }
      .user {
        display: flex;
        flex-direction: row;
      }

      .name {
        font-weight: bold;
      }

      .user-info {
        text-transform: uppercase;
      }

      .membership {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        -ms-flex-wrap: wrap;
      }

      .membershipType {
        border-right: 1px solid ${lightBlack};
        padding-right: 15px;
      }

      :global(a .about-you-link), :global(a:visited .about-you-link) {
        margin-left: 10px;
        color: ${white};
      }

      :global(a:hover .about-you-link) {
        color: ${pink};
      }

      .avatar {
        background-repeat: no-repeat;
        background-size: cover !important;
        margin-right: 25px;
        min-width: 100px;
        min-height: 100px;
      }
      .ad {
        flex: 1;
      }

      .stats {
        display: flex;
        flex-direction: row;
        margin-top: auto;
        text-align: center;
      }

      .stat {
        display: flex;
        flex-direction: column;
        padding: 0 25px;
        border-right: 1px solid ${lightBlack};
      }

      .stat:last-child {
        border: none;
      }

      @media(max-width:768px){

            .ad{margin-top:20px; max-width:100%}
            .ad .root {overflow:hidden}
            h2.name{font-size:20px;}
            h4.membership{font-size:14px}
      }
      @media(max-width:767px){
        .hero-about-you{padding:10px}
      }
      @media(max-width:640px){

        .info, .ad{display:block; max-width:100%}

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
