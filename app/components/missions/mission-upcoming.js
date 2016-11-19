import React from 'react';
import styles from './mission-sidebar.scss';

const NoContentAvailable = () => <span className="no-upcoming">No upcoming missions</span>;

const UpcomingContent = ({ content }) => {
  return (
    <div>
      <div className="cardsubTitle">
        <img className={styles.cardIcon} src={content.missionIcon} />
        <h3>{content.missionTitle}</h3>
      </div>

      <div className="upcoming-mission-date">
        <strong>{content.missionDate}</strong><br />
        {content.missionTime}
      </div>

      <a href="#" className="btn btn-primary">View Reservations</a>
    </div>
  );
}

const MissionUpcoming = (props) => {
  const {
    upcomingMission = {
      missionTitle: 'Andromeda Galaxy (M31)',
      missionIcon: 'assets/icons/Jupiter.svg',
      missionDate: 'Thursday, October 18th',
      missionTime: '10:05pm EST  ·  7:05pm PST  ·  03:05 UTC'
    },
    user = {
      name: 'Peter',
      avatarUrl: 'assets/images/graphics/peter.jpg'
    }
  } = props;  
  
  return (
    <div className="widget-container mission-upcoming">
      <div className="widget-header">
        <img src={user.avatarUrl} />
        <h2>{user.name}&rsquo;s Upcoming Mission</h2>
      </div>
      {
        upcomingMission ?
          <UpcomingContent content={upcomingMission} />
          :
          <NoContentAvailable />
      }      
    </div>      
  );
}

export default MissionUpcoming;
