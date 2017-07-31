import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MissionTime from '../partials/mission-time';
import UserDetails from '../partials/user-details';
import ShareMission from '../partials/share-mission';

class MissionNotAvailable extends Component {
  render() {
    const {
      showSlotTimes,
      slotIconURL,
      missionStart,
      slotTitle,
      showShareMissionIcons,
      shareMissionIconsText,
     } = this.props;

    const containerClassnames = classnames({
      'telescope-listings-item': 1,
      'not-available': 1,
    });

    return (
      <li className={containerClassnames}>

        <div className="col-xs-2">
          {
            showSlotTimes ?
              <MissionTime
                startTime={missionStart}
              /> : null
          }
        </div>

        <div className="col-md-4 slot-description">
          <img className="slot-logo" src={slotIconURL} width="38" alt={slotTitle} />
          <h4 className="slot-name">{slotTitle}</h4>
        </div>

        <UserDetails {...this.props} />

        <ShareMission
          showShareMissionIcons={showShareMissionIcons}
          shareMissionIconsText={shareMissionIconsText}
        />
      </li>
    );
  }
}

const { string, number, bool } = PropTypes;
MissionNotAvailable.propTypes = {
  showSloohUser: bool.isRequired,
  showShareMissionIcons: bool.isRequired,
  shareMissionIconsText: string.isRequired,

  showUserDetails: bool.isRequired,
  ownerFirstName: string.isRequired,
  ownerMembershipType: string.isRequired,
  ownerGuardianFlag: bool.isRequired,
  ownerMemberSince: string.isRequired,
  ownerAvatarURL: string.isRequired,
  ownerLocation: string.isRequired,

  slotIconURL: string.isRequired,
  missionStart: number.isRequired,
  slotTitle: string.isRequired,

  showSlotTimes: bool.isRequired,
};

export default MissionNotAvailable;
