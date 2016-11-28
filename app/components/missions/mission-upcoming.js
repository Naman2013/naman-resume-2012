import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUsersUpcomingMissions } from '../../modules/Users-Upcoming-Missions';

import styles from './mission-sidebar.scss';

const NoContentAvailable = () => <span className="no-upcoming">No upcoming missions</span>;
const FetchingMissions = () => <span className="no-upcoming">Fetching your next mission...</span>;

const UpcomingContent = ({ missionTitle, missionStart, objectIconUrl, objectTitle }) => {
  return (
    <div>
      <div className="cardsubTitle">
        <img className={styles.cardIcon} src={objectIconUrl} />
        <h3>{objectTitle}</h3>
      </div>

      <div className="upcoming-mission-date">
        <strong>Thursday, October 18th</strong><br />
        10:05pm EST  ·  7:05pm PST  ·  03:05 UTC
      </div>

      <a href="#" className="btn btn-primary">View Reservations</a>
    </div>
  );
}

const mapStateToProps = ( state, ownProps ) => ({
  usersUpcomingMission: state.usersUpcomingMission,
});

const mapDispatchToProps = ( dispatch ) => ({
  actions: bindActionCreators({
    fetchUsersUpcomingMissions,
  }, dispatch),
});

@connect( mapStateToProps, mapDispatchToProps )
class MissionUpcoming extends Component {

  componentWillMount() {
    this.props.actions.fetchUsersUpcomingMissions();
  }

  renderUpcomingMission() {
    if(this.props.usersUpcomingMission) {
      console.log(this.props.usersUpcomingMission);
      const { missionList } = this.props.usersUpcomingMission.upcomingMission;
      const currentMission = missionList[0];

      const {
        displayName,
        avatarURL,
        objectTitle,
        objectIconURL,
        missionStart,
        userHasReservation } = currentMission;

        return(
          <div>
            <div className="widget-header">
              <img height="50" src={avatarURL} />
              <h2>{displayName}&rsquo;s Upcoming Mission</h2>
            </div>
            {
              userHasReservation ?
                <UpcomingContent content={upcomingMission} />
                :
                <NoContentAvailable />
            }
          </div>
        );
    }

    return( <NoContentAvailable /> );
  }

  render() {
    const { fetchingMissions } = this.props.usersUpcomingMission;

    return (
      <div className="widget-container mission-upcoming">
        {
          fetchingMissions ?
            <FetchingMissions />
            :
            this.renderUpcomingMission()
        }
      </div>
    );
  }
}

export default MissionUpcoming;
