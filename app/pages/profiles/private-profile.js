import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDashboard } from '../../modules/dashboard/actions';
import MyObservations from '../../components/profiles/private-profile/my-observations';
import AskAstronomerQuestionList from '../../components/profiles/private-profile/ask-astronomer-question-list';
import ProfileMissions from '../../components/profiles/mission-list';
import {
  lightGray,
  gray,
  darkBlueGray,
  white,
} from '../../styles/variables/colors';
import { profilePhotoStyle } from '../../styles/mixins/utilities';

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
    const avatarStyle = Object.assign(profilePhotoStyle(dashboard.profile.avatarURL), { backgroundSize: 'cover' });
    const membershipType = dashboard.profile.membershipType;
    return (
      <div className="private-profile">
        <header className="main-header">
          <div style={avatarStyle} />
          <div className="main-header-info">
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: dashboard.profile.displayName }}
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
            <ProfileMissions missionList={dashboard.missionList} />
          </div>
          : null}

        {componentsByRole[membershipType] && componentsByRole[membershipType].indexOf('askastronomer') > -1 ?
          <div className="section">
            <div className="header">
              <h4 className="emphasis uppercase">Activity Feed: This Just In, Just For You</h4>
              <h5>Questions from the community</h5>
            </div>
            <AskAstronomerQuestionList />
          </div>
          : null}

        {componentsByRole[membershipType] && componentsByRole[membershipType].indexOf('myobservations') > -1 ?
          <div className="section">
            <div className="header">
              <h4 className="emphasis uppercase">My Observations</h4>
              <h5>Recent Activity on Slooh</h5>
            </div>
            <MyObservations cid={user.cid} />
          </div>
          : null}
        <style jsx>{`
          .private-profile {
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
          .emphasis {
            font-weight: bold;
          }
          .header {
            padding: 10px 5px;
            border-top: 1px solid ${lightGray};
            border-bottom: 1px solid ${lightGray};
            margin-bottom: 10px;
          }
          .uppercase {
            text-transform: uppercase;
          }

          .section {
            padding: 25px;
            margin: 10px 0;
          }
        `}</style>
      </div>
    );
  }
}

export default PrivateProfile;
