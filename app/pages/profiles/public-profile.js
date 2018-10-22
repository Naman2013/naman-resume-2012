import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPublicProfile } from '../../modules/public-profile/actions';
import PublicObservations from '../../components/profiles/public-profile/public-observations';
import ProfileMissions from '../../components/profiles/mission-list';
import {
  lightGray,
  gray,
  darkBlueGray,
  white,
} from '../../styles/variables/colors';
import { profilePhotoStyle } from '../../styles/mixins/utilities';

const {
  arrayOf,
  shape,
  string,
  number,
} = PropTypes;
const componentsByRole = {
  ASTRONOMER: ['observations', 'missions'],
  APPRENTICE: ['observations', 'missions'],
  LUMINARY: ['observations', 'missions'],
  HOST: ['observations'],
  ASTROLAB: ['observations', 'missions'],
};
const mapStateToProps = ({
  publicProfile,
}) => ({
  publicProfile,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchPublicProfile
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PublicProfile extends Component {
  static propTypes = {
    publicProfile: shape({
      missionList: arrayOf(shape({
        categoryDescription: string,
        expires: number,
        missionIconURL: string,
        missionIndex: number,
        missionStart: number,
        missionTitle: string,
        observatoryUniqueId: string,
        scheduledMissionId: number,
        telescopePierName: string,
        telescopeUniqueId: string,
        userReservationType: string,
      })),
    }),
  }

  static defaultProps = {
    publicProfile: {
      categoryDescription: '',
      expires: 0,
      missionIconURL: '',
      missionIndex: 0,
      missionStart: 0,
      missionTitle: '',
      observatoryUniqueId: '',
      scheduledMissionId: 0,
      telescopePierName: '',
      telescopeUniqueId: '',
      userReservationType: '',
    },
  }

  constructor(props) {
    super();
    props.actions.fetchPublicProfile({
      customerId: props.params.cid,
    });
  }

  render() {
    const {
      publicProfile,
      params: { cid },
    } = this.props;
    const avatarStyle = Object.assign(profilePhotoStyle(publicProfile.avatarURL), { backgroundSize: 'cover' });
    const membershipType = publicProfile.membershipType;

    return (
      <div className="public-profile">
        <header className="main-header">
          <div style={avatarStyle} />
          <div className="main-header-info">
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: publicProfile.displayName }}
            />
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: membershipType }}
            />
          </div>
        </header>

        {componentsByRole[membershipType] && componentsByRole[membershipType].indexOf('missions') > -1 ?
        <div className="section">
          <div className="uppercase">
            <h4 className="emphasis">My Upcoming Missions</h4>
          </div>
          <ProfileMissions missionList={publicProfile.missionList} />
        </div>
        : null}
        {componentsByRole[membershipType] && componentsByRole[membershipType].indexOf('observations') > -1 ? <PublicObservations cid={cid} /> : null}
      <style jsx>{`
        .public-profile {
          background-color: ${gray};
          color: ${darkBlueGray};
        }
        .main-header {
          background-color: ${white};
          padding: 25px;
          display: flex;
          flex-direction: row;
        }
        .main-header-info {
          margin: 0 25px;
        }
        .section {
          padding: 25px;
          margin: 10px 0;
        }
        .uppercase {
          text-transform: uppercase;
        }
        .emphasis {
          font-weight: bold;
        }
      `}</style>
      </div>
    );
  }
}

export default PublicProfile;
