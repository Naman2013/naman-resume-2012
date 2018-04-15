import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPublicProfile } from '../../modules/public-profile/actions';
import PublicObservations from '../../components/profiles/public-profile/public-observations';
import ProfileMissions from '../../components/profiles/mission-list';
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

    // To Do: Delete
    const membershipType = 'ASTRONOMER';

    return (
      <div>Public Profile
        {componentsByRole[membershipType].indexOf('missions') > -1 ? <ProfileMissions missionList={publicProfile.missionList} /> : null}
        {componentsByRole[membershipType].indexOf('observations') > -1 ? <PublicObservations cid={cid} /> : null}
      </div>
    );
  }
}

export default PublicProfile;
