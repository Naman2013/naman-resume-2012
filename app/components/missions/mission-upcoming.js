import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment-timezone';

import { fetchUsersUpcomingMissions } from '../../modules/Users-Upcoming-Missions';

import styles from './mission-sidebar.scss';

/**
  TODO: still need to send user to view reservations
  if they have a reservation to view...
*/

const NoContentAvailable = () => <span className="no-upcoming">No upcoming missions</span>;
const FetchingMissions = () => <span className="no-upcoming">Fetching your next mission...</span>;

const UpcomingContent = ({
  missionTitle,
  missionStart,
  objectIconURL,
  objectTitle }) => {

  const formattedUTCDate = new Date(missionStart * 1000);

  const EST_start = moment.tz(formattedUTCDate, 'America/New_York').format('dddd, MMMM Do');
  const EST_start_time = moment.tz(formattedUTCDate, 'America/New_York').format('h:mma z');
  const PST_start_time = moment.tz(formattedUTCDate, 'America/Los_Angeles').format('h:mma z');
  const UTC_start_time = moment.utc(formattedUTCDate).format('HH:mm z');

  return (
    <div>
      <div className="cardsubTitle">
        <img className={styles.cardIcon} src={objectIconURL} />
        <h3>{objectTitle}</h3>
      </div>

      <div className="upcoming-mission-date">
        <strong>{EST_start}</strong><br />
        {EST_start_time} · {PST_start_time} · {UTC_start_time}
      </div>

      <a href="#" className="btn btn-primary">View Reservations</a>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  usersUpcomingMission: state.usersUpcomingMission,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    fetchUsersUpcomingMissions,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
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
                <UpcomingContent
                  missionTitle={objectTitle}
                  missionStart={missionStart}
                  objectIconURL={objectIconURL}
                  objectTitle={objectTitle}
                />
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
