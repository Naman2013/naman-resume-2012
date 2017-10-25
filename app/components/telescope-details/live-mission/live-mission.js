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
      expires,
      objectTitle,
      objectIconURL,
      nextMissionAvailable,
      nextTitle,
      nextObjectIconURL,
      ownerLocation,
      ownerDisplayName,
      ownerMembershipType,
      ownerMemberSince,
      ownerAvatarURL,
      showSloohUser,
      showUserDetails,
      objectDescription,
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
                  objectDescription ?
                    <div className="users-quote">
                      <p>
                        &quot;{objectDescription}&quot;
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

        <style jsx>{liveMissionStyle}</style>
      </div>
    );
  }
}

LiveMission.propTypes = {
  missionAvailable: PropTypes.bool.isRequired,
  missionObjective: PropTypes.string.isRequired,
  expires: PropTypes.number.isRequired,
  objectTitle: PropTypes.string.isRequired,
  nextMissionAvailable: PropTypes.bool.isRequired,
  objectIconURL: PropTypes.string.isRequired,

  objectDescription: PropTypes.string,

  nextTitle: PropTypes.string.isRequired,
  nextObjectIconURL: PropTypes.string.isRequired,

  ownerLocation: PropTypes.string.isRequired,
  ownerDisplayName: PropTypes.string.isRequired,
  ownerMembershipType: PropTypes.string.isRequired,
  ownerMemberSince: PropTypes.string.isRequired,
  ownerAvatarURL: PropTypes.string.isRequired,

  showSloohUser: PropTypes.bool.isRequired,
  showUserDetails: PropTypes.bool.isRequired,
};

LiveMission.defaultProps = {
  objectDescription: '',
};

export default LiveMission;
