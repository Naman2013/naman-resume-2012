import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MissionTime from '../partials/mission-time';
import ShareMission from '../partials/share-mission';
import UserDetails from '../partials/user-details';
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
class MissionReserved extends Component {
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
    const {
      showPiggybackButton,
      showShareMissionIcons,
      shareMissionIconsText } = this.props;

    if(showPiggybackButton) {
      return(
        <div className="col-xs-2 piggyback-on-mission-action">
          <button
            onClick={this.handlePiggybackClick}
            className="btn-primary"
          >
            Piggyback on Mission
          </button>
        </div>
      );
    }

    if(showShareMissionIcons || shareMissionIconsText) {
      return(
        <ShareMission
          showShareMissionIcons={showShareMissionIcons}
          shareMissionIconsText={shareMissionIconsText}
        />
      );
    }

  }

  render() {
    const {
      slotIconURL,
      missionStart,
      slotTitle,
      showSlotTimes } = this.props;

    const containerClassnames = classnames({
      'telescope-listings-item': 1,
      'reserved': 1,
    });

    return(
      <li className={containerClassnames}>

        <div className="col-xs-2">
          {
            showSlotTimes ?
            <MissionTime
              startTime={missionStart}
            /> : null
          }
        </div>

        <div className="col-xs-4 slot-description">
          <img className="slot-logo" src={slotIconURL} width="38" alt=""/>
          <h4 className="slot-name">{slotTitle}</h4>
        </div>

        <UserDetails {...this.props} />

        {
          this.renderMissionStatus()
        }
      </li>
    );
  }
}



const { string, number, bool } = PropTypes;
MissionReserved.propTypes = {
  showSloohUser: bool.isRequired,

  showUserDetails: bool.isRequired,
  ownerDisplayName: string.isRequired,
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
  shareMissionIconsText: string.isRequired,

  uniqueId: string,
  scheduledMissionId: number,

  showSlotTimes: bool.isRequired,
};

export default MissionReserved;
