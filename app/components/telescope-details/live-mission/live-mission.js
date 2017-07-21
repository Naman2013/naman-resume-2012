import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ByUserTag from '../../common/by-user-tag/by-user-tag';
import InlineCountdown from '../../common/inline-countdown/inline-countdown';
import liveMissionStyle from './live-mission.style';

class LiveMission extends Component {
  state = {
    classes: [],
  }

  render() {
    const {
      missionAvailable,
      missionObjective,
      missionLikeCount,
      expires,
      objectTitle,
      objectIconURL,
      nextMissionAvailable,
      nextStart,
      nextTitle,
      nextObjectIconURL,
      ownerLocation,
      ownerDisplayName,
      ownerMembershipType,
      ownerMemberSince,
      ownerAvatarURL,
      showSloohUser,
      showUserDetails,
     } = this.props;

    return (
      <div className="live-mission">
        <div className="content">
          {
            missionAvailable ?
              <div>
                <div className="header">
                  <h3 className="title">CURRENT LIVE MISSION:</h3>
                  <div className="current-mission-title">
                    <img alt="" height="25" src={objectIconURL} />
                    <p className="mission-title">{objectTitle}</p>
                  </div>
                </div>

                {
                  showSloohUser ?
                    <div style={{ marginBottom: '20px' }}>
                      <img alt="Slooh" height="30" src={ownerAvatarURL} />
                    </div> : null
                }

                {
                  showUserDetails ?
                    <ByUserTag
                      theme="dark"
                      photo={ownerAvatarURL}
                      name={ownerDisplayName}
                      accountType={ownerMembershipType}
                      memberSince={ownerMemberSince}
                      location={ownerLocation}
                    /> : null
                }

                {
                  missionObjective ?
                    <div className="users-quote">
                      <p>
                        &quot;{missionObjective}&quot;
                      </p>
                    </div> : null
                }
              </div>
            : null
          }
        </div>

        {
          nextMissionAvailable ?
            <div className="footer">
              <p>NEXT MISSION:</p>
              <div className="mission clearfix">

                <div className="col-xs-2">
                  <img alt="" height="25" className="mission-icon" src={nextObjectIconURL} />
                </div>

                <div className="col-xs-7 nopadding">
                  <p>
                    {nextTitle}
                  </p>
                </div>

                <div className="col-xs-3 push-right">
                  <span className="count-down">in <InlineCountdown startTime={expires} /></span>
                </div>
              </div>
            </div> : null
        }

        <style jsx>{`
          ${liveMissionStyle}
        `}</style>
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
  objectIconURL: string.isRequired,

  nextStart: number.isRequired,
  nextTitle: string.isRequired,
  nextObjectIconURL: string.isRequired,

  ownerLocation: string.isRequired,
  ownerDisplayName: string.isRequired,
  ownerMembershipType: string.isRequired,
  ownerMemberSince: string.isRequired,
  ownerAvatarURL: string.isRequired,

  showSloohUser: bool.isRequired,
  showUserDetails: bool.isRequired,
};

export default LiveMission;
