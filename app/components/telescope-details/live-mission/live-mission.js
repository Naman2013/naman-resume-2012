import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import ByUserTag from '../../common/by-user-tag/by-user-tag';
import InlineCountdown from '../../common/inline-countdown/inline-countdown';
import './live-mission.scss';

class LiveMission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: []
    };
  };

  render() {
    const {
      missionAvailable,
      missionObjective,
      missionLikeCount,
      expires,
      objectTitle,
      nextMissionAvailable,
      nextStart,
      nextTitle,
      nextObjectIconURL,
      ownerLocation,
      ownerDisplayName,
      ownerMembershipType,
      ownerMemberSince,
      ownerAvatarURL } = this.props;

    return(
      <div className="live-mission">
        <div className="content">

          {
            missionAvailable ?
                <div>
                  <div className="header">
                    <h3 className="title">CURRENT LIVE MISSION:</h3>
                    <p className="mission-title">{objectTitle}</p>
                  </div>

                  <ByUserTag
                    theme="dark"
                    photo={ownerAvatarURL}
                    name={ownerDisplayName}
                    accountType={ownerMembershipType}
                    memberSince={ownerMemberSince}
                    location={ownerLocation}
                  />

                  {
                    missionObjective ?
                    <div className="users-quote">
                      <p>
                        &quot;{missionObjective}&quot;
                      </p>
                    </div> : null
                  }
                </div>
            :
            <div className="header">
              <h3 className="title">Standby...</h3>
            </div>
          }
          </div>

        {
          nextMissionAvailable ?
            <div className="footer">
              <p>NEXT MISSION:</p>
              <div className="mission">
                <img height="25" className="mission-icon" src={nextObjectIconURL} />
                <p>{nextTitle}</p>
                <span className="count-down">in <InlineCountdown startTime={expires} /></span>
              </div>
            </div> : null
        }

      </div>
    );
  }
}

const { string, number, bool } = PropTypes;
LiveMission.propTypes = {
  missionAvailable: bool.isRequired,
  missionObjective: string.isRequired,
  missionLikeCount: number.isRequired,
  expires: number.isRequired,
  objectTitle: string.isRequired,
  nextMissionAvailable: bool.isRequired,

  nextStart: number.isRequired,
  nextTitle: string.isRequired,
  nextObjectIconURL: string.isRequired,

  ownerLocation: string.isRequired,
  ownerDisplayName: string.isRequired,
  ownerMembershipType: string.isRequired,
  ownerMemberSince: string.isRequired,
  ownerAvatarURL: string.isRequired,
};

export default LiveMission;
