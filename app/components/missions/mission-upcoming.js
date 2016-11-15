import React from 'react';
import styles from './mission-sidebar.scss';

const getContent = (upcomingMission) => {
  if (upcomingMission) {
    return (
      <div>
        <div className="cardsubTitle">
          <img className={styles.cardIcon} src={upcomingMission.missionIcon} />
          <h3>{upcomingMission.missionTitle}</h3>
        </div>

        <div className="upcoming-mission-date">
          <strong>{upcomingMission.missionDate}</strong><br />
          {upcomingMission.missionTime}
        </div>

        <a href="#" className="btn btn-primary">View Reservations</a>
      </div>
    );
  } else {
    return <span className="no-upcoming">No upcoming missions</span>;
  }
}

const getWidgetContent = (upcomingMission, user) => {
  return (
    <div className="widget-container mission-upcoming">
      <div className="widget-header">
        <img src={user.avatarUrl} />
        <h2>{user.name}&rsquo;s Upcoming Mission</h2>
      </div>
      {
        getContent(upcomingMission) 
      }      
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
  
  return getWidgetContent(upcomingMission, user);
}

export default MissionUpcoming;
