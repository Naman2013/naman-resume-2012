import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MissionTime from '../partials/mission-time';
import ByUserTag from '../../../common/by-user-tag/by-user-tag';
import Logo from '../../../common/logo/logo';
import {
  grabPiggybackByTelescope,
  resetMissionAvailability } from '../../../../modules/Piggyback';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    grabPiggybackByTelescope,
    resetMissionAvailability,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class PiggybackOnMission extends Component {
  constructor(props) {
    super(props);

    this.handlePiggybackClick = this.handlePiggybackClick.bind(this);
  }

  handlePiggybackClick(event) {
    event.preventDefault();
    const { uniqueId, scheduledMissionId } = this.props;
    this.props.actions.grabPiggybackByTelescope({ uniqueId, scheduledMissionId });
  }

  renderMissionStatus() {
    const { showPiggybackButton, showShareMissionIcons } = this.props;

    if(showPiggybackButton) {
      return(
        <div className="col-xs-2 piggyback-on-mission-action">
          <button
            onClick={this.handlePiggybackClick}
            className="action"
          >
            Piggyback on mission
          </button>
        </div>
      );
    }

    if(showShareMissionIcons) {
      return(
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
      );
    }
  }

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
      slotTitle,
      showPiggybackButton,
      showShareMissionIcons } = this.props;

    const containerClassnames = classnames({
      'telescope-listings-item': 1,
      'reserved': 1,
    });

    return(
      <li className={containerClassnames}>

        <div className="col-xs-2">
          <MissionTime
            startTime={missionStart}
          />
        </div>

        <div className="col-xs-4 slot-description">
          <img className="slot-logo" src={slotIconURL} width="38" alt=""/>
          <span className="slot-name">{slotTitle}</span>
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
          this.renderMissionStatus()
        }
      </li>
    );
  }
}



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

  showPiggybackButton: bool.isRequired,
  showShareMissionIcons: bool.isRequired,

  uniqueId: string,
  scheduledMissionId: number,
};

export default PiggybackOnMission;
