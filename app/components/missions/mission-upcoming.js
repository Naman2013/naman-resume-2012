import React from 'react';
import styles from './mission-sidebar.scss';

const getContent = (upcomingMission) => {
  if (upcomingMission) {
    return (
      <div>
        <div className="cardsubTitle">
          <img className={styles.cardIcon} src="assets/icons/Jupiter.svg" />
          <h3>Andromeda Galaxy (M31)</h3>
        </div>

        <div className="upcoming-mission-date">
          <strong>Thursday, October 18th</strong><br />
          10:05pm EST  ·  7:05pm PST  ·  03:05 UTC
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
        getContent() 
      }      
    </div>      
  );
}

const MissionUpcoming = (props) => {
  const {
    upcomingMission,
    user = {
      name: 'Peter',
      avatarUrl: 'assets/images/graphics/peter.jpg'
    }
  } = props;  
  
  return getWidgetContent(upcomingMission, user);
}

export default MissionUpcoming;
