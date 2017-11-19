import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ByUserTag from '../../common/by-user-tag/by-user-tag';
import liveMissionStyle from './live-mission.style';

class LiveMission extends Component {
  state = {
    classes: [],
  }

  render() {
    const {
      missionAvailable,
      objectTitle,
      objectIconURL,
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
                <div>
                  <div className="current-mission-title-container">
                    <img alt="" height="50" src={objectIconURL} />
                    <div className="current-mission-title">
                      <h3 className="title">CURRENT LIVE MISSION</h3>
                      <p className="mission-title">{objectTitle}</p>
                    </div>
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

        <style jsx>{liveMissionStyle}</style>
      </div>
    );
  }
}

LiveMission.propTypes = {
  missionAvailable: PropTypes.bool.isRequired,
  objectTitle: PropTypes.string.isRequired,
  objectIconURL: PropTypes.string.isRequired,

  objectDescription: PropTypes.string,

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
