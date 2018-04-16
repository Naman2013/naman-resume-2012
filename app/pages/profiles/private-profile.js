import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDashboard } from '../../modules/dashboard/actions';
import MyObservations from '../../components/profiles/private-profile/my-observations';
import AskAstronomerQuestionList from '../../components/profiles/private-profile/ask-astronomer-question-list';
import ProfileMissions from '../../components/profiles/mission-list';

const componentsByRole = {
  ASTRONOMER: ['missions', 'myobservations', 'askastronomer'],
  APPRENTICE: ['missions', 'myobservations'],
  LUMINARY: ['missions', 'myobservations'],
  HOST: ['myobservations'],
  ASTROLAB: ['missions', 'myobservations'],
};
const mapStateToProps = ({
  dashboard,
  user,
}) => ({
  dashboard,
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchDashboard,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class PrivateProfile extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super();
    props.actions.fetchDashboard({});
  }

  render() {
    const {
      dashboard,
      user,
    } = this.props;

    // To Do: Delete
    const membershipType = 'ASTRONOMER';
    return (
      <div>Private Profile
        {componentsByRole[membershipType].indexOf('missions') > -1 ? <ProfileMissions missionList={dashboard.missionList} /> : null}
        {componentsByRole[membershipType].indexOf('myobservations') > -1 ? <MyObservations cid={user.cid} /> : null}
        {componentsByRole[membershipType].indexOf('askastronomer') > -1 ? <AskAstronomerQuestionList /> : null}
      </div>
    );
  }
}

export default PrivateProfile;
