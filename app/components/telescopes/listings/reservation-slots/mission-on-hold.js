import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import InlineCountdown from '../../../common/inline-countdown/inline-countdown';
import MissionTime from '../partials/mission-time';
import ByUserTag from '../../../common/by-user-tag/by-user-tag';

class MissionOnHold extends Component {
  render() {
    const {
      missionStart,
      showSlotTimes,
      expires,
      ownerAvatarURL,
      ownerDisplayName,
      ownerLocation,
      ownerMembershipType,
      ownerMemberSince } = this.props;

    return(
      <li className="telescope-listings-item on-hold">

        <div className="col-xs-2">
          {
            showSlotTimes ?
            <MissionTime
              startTime={missionStart}
            /> : null
          }
        </div>

        <div className="col-md-4 slot-description">
          <img className="slot-logo" src="assets/icons/question-mark.png" width="38" alt=""/>
          <h4 className="slot-name">On Hold. Object Not Yet Set.</h4>
        </div>

        <div className="col-xs-4 reserved-by-user-content">
          <h3 className="title">Reserved by:</h3>
          <ByUserTag
            theme="light"
            photo={ownerAvatarURL}
            name={ownerDisplayName}
            accountType={ownerMembershipType}
            location={ownerLocation}
            memberSince={ownerMemberSince}
          />
        </div>

        <div className="col-xs-2 hold-timer-content">
          <h5 className="hold-timer"><InlineCountdown startTime={expires} /></h5>
          <p className="title">Hold time remaining.</p>
        </div>

      </li>
    );
  }
}

const { string, number, bool } = PropTypes;
MissionOnHold.propTypes = {
  showSlotTimes: bool.isRequired,
  missionStart: number.isRequired,
  expires: number.isRequired,

  ownerAvatarURL: string.isRequired,
  ownerDisplayName: string.isRequired,
  ownerLocation: string.isRequired,
  ownerMembershipType: string.isRequired,
  ownerMemberSince: string.isRequired,
};

export default MissionOnHold;
