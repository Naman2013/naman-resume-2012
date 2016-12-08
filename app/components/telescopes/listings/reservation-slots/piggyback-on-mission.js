import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import MissionTime from '../partials/mission-time';
import ByUserTag from '../../../common/by-user-tag/by-user-tag';
import Logo from '../../../common/logo/logo';

class PiggybackOnMission extends Component {
  render() {
    const {
      showSloohUser,
      showUserDetails,
      ownerId,
      ownerFirstName,
      ownerMembershipType,
      ownerGuardianFlag,
      ownerMemberSince,
      ownerAvatarURL,
      ownerLocation,
      slotIconURL,
      missionStart,
      slotTitle, } = this.props;

    const containerClassnames = classnames({
      'telescope-listings-item': 1,
      'reserved': 1,
    });

    return(
      <li className={containerClassnames}>

        <div className="col-xs-2">
          <MissionTime />
        </div>

        <div className="col-xs-4 slot-description">
          <img className="slot-logo" src="assets/icons/Jupiter.svg" width="38" alt=""/>
          <span className="slot-name">Jupiter</span>
        </div>

        <div className="col-xs-4 reserved-by-user-content">
          <h3 className="title">Reserved by:</h3>
          {
            showSloohUser ?
              <Logo />
              :
              <ByUserTag
                theme="light"
                photo={ownerAvatarURL}
                name={ownerFirstName}
                accountType={ownerMembershipType}
                location={ownerLocation}
                memberSince={ownerMemberSince}
              />
          }
        </div>

        {
          this.props.piggybackReserved ?
          <div className="col-xs-2 piggyback-accepted">
            <ul className="social-icons">
              <li className="action-container">
                <button className="action">
                  <span className="fa fa-twitter-square"></span>
                </button>
              </li>
              <li className="action-container">
                <button className="action">
                  <span className="fa fa-facebook-square"></span>
                </button>
              </li>
              <li className="action-container">
                <button className="action">
                  <span className="fa fa-google-plus-square"></span>
                </button>
              </li>
              <li className="action-container">
                <button className="action">
                  <span className="fa fa-instagram"></span>
                </button>
              </li>
            </ul>

            <h4 className="title">You have <b>joined</b> this mission.</h4>
          </div>
          :
          <div className="col-xs-2 piggyback-on-mission-action">
            <button className="action">Piggyback on mission</button>
          </div>
        }
      </li>
    );
  }
}

PiggybackOnMission.defaultProps = {
  piggybackReserved: true,
};

const { string, number, bool } = PropTypes;
PiggybackOnMission.propTypes = {
  showSloohUser: bool.isRequired,

  showUserDetails: bool.isRequired,
  ownerId: number.isRequired,
  ownerFirstName: string.isRequired,
  ownerMembershipType: string.isRequired,
  ownerGuardianFlag: bool.isRequired,
  ownerMemberSince: string.isRequired,
  ownerAvatarURL: string.isRequired,
  ownerLocation: string.isRequired,

  slotIconURL: string.isRequired,
  missionStart: number.isRequired,
  slotTitle: string.isRequired,
};

export default PiggybackOnMission;
