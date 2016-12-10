import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MissionTime from '../partials/mission-time';
import UserDetails from '../partials/user-details';

const UserDetailsContainer = ({ children }) => (
  <div className="col-xs-4 reserved-by-user-content">
    <h3 className="title">Reserved by:</h3>
    {children}
  </div>
);

class MissionNotAvailable extends Component {
  render() {
    const {
      showSlotTimes,
      slotIconURL,
      missionStart,
      slotTitle } = this.props;

    const containerClassnames = classnames({
      'telescope-listings-item': 1,
      'not-available': 1,
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

        <div className="col-md-4 slot-description">
          <img className="slot-logo" src={slotIconURL} width="38" alt={slotTitle} />
          <h4 className="slot-name">{slotTitle}</h4>
        </div>

        <UserDetails {...this.props} />
      </li>
    );
  }
}

const { string, number, bool } = PropTypes;
MissionNotAvailable.propTypes = {
  showSloohUser: bool.isRequired,

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
